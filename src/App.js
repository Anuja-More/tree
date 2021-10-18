import React from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";
import SortableTree, {
  toggleExpandedForAll,
  // getNodeAtPath,
  // addNodeUnderParent,
  removeNode
  // changeNodeAtPath
} from "react-sortable-tree";
import treeData from "./treeData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faTrashAlt,
  faPlus
  // faPen,
  // faExpandArrowsAlt,
  // faCompressArrowsAlt
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { addGroup, editGroup, removeGroup } from "./actions";
import store from "./store/index";

const maxDepth = 5;
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [],
      open: false,
      nodeValue: null,
      currentNode: null,
      showGridView: false,
      isChecked: false,
      editModal: false,
      selectOption: "",
      isParent: false,
      value: "text"
    };
    this.handleChange = this.handleChange.bind(this);
    this.addNode = this.addNode.bind(this);
    this.editNode = this.editNode.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    const state = store.getState();
    this.setState({ treeData: state["group"][0] });
  }
  handleChange(event) {
    this.setState({ nodevalue: event.target.value });
  }

  // for adding node
  addNode(event) {
    console.log(event);
    event.preventDefault();
    this.props.addGroup({
      treeData: this.state.treeData ? this.state.treeData : [],
      curretNodeAray: [],
      title: this.state.nodeValue,
      currentNode: this.state.currentNode,
      inputType: this.state.value,
      extendedNode: this.state.extendedNode
    });
    this.setState((prevState) => ({
      treeData: toggleExpandedForAll({ treeData: prevState.treeData })
    }));
    this.setState({ treeData: [], open: false });
  }

  // for editing node

  editNode(event) {
    event.preventDefault();
    this.props.editGroup({
      treeData: this.state.treeData ? this.state.treeData : [],
      title: this.state.nodeValue,
      selectOption: this.state.selectedOption,
      inputType: this.state.value,
      currentNodeArray: this.state.currentNode
    });
    this.setState({ treeData: [], editModal: false });
  }
  // removing node
  removeNode(extendNode) {
    let { node } = extendNode;
    this.setState({ currentNodeArray: node });
    setTimeout(() => {
      this.props.removeGroup({
        treeData: this.state.treeData ? this.state.treeData : [],
        currentNodeArray: this.state.currentNode
      });
      this.setState({ treeData: this.state.treeData });
      this.setState((prevState) => ({
        treeData: toggleExpandedForAll({ treeData: prevState.treeData })
      }));
    }, 500);
  }

  onOpenModal = (extendedNode) => {
    let { node } = extendedNode;
    this.setState({ currentNode: node["title"] });
    if (extendedNode.node["type"] === "group") {
      this.setState({ isParent: true });
    } else {
      this.setState({ isParent: false });
    }
    this.setState({
      open: true,
      value: this.state.value,
      extendNode: this.state.extendedNode
    });
  };

  changeFiledName = (extendedNode) => {
    let { node } = extendedNode;
    this.state({ currentNode: node["title"] });
    if (extendedNode.node["type"] === "group") {
      this.setState({ isParent: true });
    } else {
      this.setState({ isParent: false });
    }
    this.setState({
      editModal: true,
      selectedOption: "",
      nodeValue: "",
      currentNodeArray: node
    });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  closeEditModal = () => {
    this.setState({ editModal: false });
  };

  handleDropdownChange(event) {
    this.setState({ value: event.target.vale });
  }

  handleTreeOnChange = (treeData) => {
    this.setState({ treeData });
  };

  toggleNodeExpansion = (expanded) => {
    this.setState((prevState) => ({
      treeData: toggleExpandedForAll({
        treeData: prevState.treeData,
        expanded
      })
    }));
  };

  // getNodeKey = ({ treeIndex: number }) => {
  //   if (number === -1) {
  //     number = null;
  //   }
  //   return number;
  // };

  // editTask = (path) => {
  //   let editedNode = getNodeAtPath({
  //     treeData: this.state.treeData,
  //     path: path,
  //     getNodeKey: ({ treeIndex }) => treeIndex,
  //     ignoreCollapsed: true
  //   });
  //   let newTaskTitle = prompt("Task new name:", editedNode.node.title);
  //   if (newTaskTitle === null) return false;

  // //   editedNode.node.title = newTaskTitle;

  //   let newTree = changeNodeAtPath({
  //     treeData: this.state.treeData,
  //     path: path,
  //     newNode: editedNode.node,
  //     getNodeKey: ({ treeIndex }) => treeIndex,
  //     ignoreCollapsed: true
  //   });
  //   console.log(newTree);
  //   this.setState({ treeData: newTree });
  // };

  // addTask = (path) => {
  //   let newTaskTitle = prompt("Task name:", "default");
  //   if (newTaskTitle === null) return false;

  //   let NEW_NODE = { title: newTaskTitle };
  //   let parentNode = getNodeAtPath({
  //     treeData: this.state.treeData,
  //     path: path,
  //     getNodeKey: ({ treeIndex }) => treeIndex,
  //     ignoreCollapsed: true
  //   });
  //   let parentKey = this.getNodeKey(parentNode);
  //   let newTree = addNodeUnderParent({
  //     treeData: this.state.treeData,
  //     newNode: NEW_NODE,
  //     expandParent: true,
  //     parentKey: parentKey,
  //     getNodeKey: ({ treeIndex }) => treeIndex
  //   });
  //   this.setState({ treeData: newTree.treeData });
  // };

  removeTask = (path) => {
    let newTree = removeNode({
      treeData: this.state.treeData,
      path: path,
      ignoreCollapsed: true,
      getNodeKey: ({ treeIndex }) => treeIndex
    });
    this.setState({ treeData: newTree.treeData });
  };

  renderTasks = () => {
    const canDrop = ({ nextParent, prevParent }) => {
      if (nextParent !== null && prevParent !== null) {
        if (prevParent.type === "section") {
          return false;
        }
      }
      if (nextParent !== null && prevParent !== null) {
        if (
          prevParent.type === "group" &&
          (nextParent.type === "section" || nextParent.type === "children")
        ) {
          return false;
        }
      } else {
        return false;
      }
      return true;
    };
    const inputType = [
      "text",
      "email",
      "password",
      "checkbox",
      "radio",
      "range",
      "reset"
    ];

    return (
      <SortableTree
        treeData={this.state.treeData}
        onChange={this.handleTreeOnChange}
        canNodeHaveChildren={(node) => !node.isDragable}
        maxDepth={maxDepth}
        canDrag={({ node }) => !node.noDragging}
        canDrop={canDrop}
        isVirtualized={true}
        generateNodeProps={(extendedNode) => ({
          buttons: [
            <Button
              title="Add"
              variant="link"
              style={{
                display:
                  extendedNode.node.type !== "section" &&
                  extendedNode.node.type === "group"
              }}
              onClick={(event) => this.onOpenModal}
            >
              <FontAwesomeIcon icon={faPlus} color="#007bff" />
            </Button>

            // <Button variant="link" onClick={() => this.addTask(taskInfo.path)}>
            //   <FontAwesomeIcon icon={faPlus} color="#007bff" />
            // </Button>,
            // <Button
            //   variant="link"
            //   onClick={() => this.removeTask(taskInfo.path)}
            // >
            //   <FontAwesomeIcon icon={faTrashAlt} color="#dc3545" />
            // </Button>
          ]
        })}
      />
    );
  };

  render() {
    return (
      <div className="wrapper">
        <div className="tree-wrapper">
          <ButtonGroup aria-label="Toolbar" className="list-toolbar">
            <Button
              variant="primary"
              className="add-primary"
              onClick={() => this.onOpenModal([])}
            >
              <FontAwesomeIcon icon={faPlus} color="white" />
            </Button>
            {/* <Button
              variant="primary"
              onClick={this.toggleNodeExpansion.bind(this, true)}
            >
              <FontAwesomeIcon icon={faExpandArrowsAlt} />
            </Button>
            <Button
              variant="primary"
              onClick={this.toggleNodeExpansion.bind(this, false)}
            >
              <FontAwesomeIcon icon={faCompressArrowsAlt} />
            </Button> */}
          </ButtonGroup>

          {this.renderTasks()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  group: state.group
});
export default connect(mapStateToProps, { addGroup, editGroup, removeGroup })(
  App
);
