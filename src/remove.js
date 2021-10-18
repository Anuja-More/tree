if (action.type=== REMOVE_NODE) {
    const duplicategroup = action.payload.treeData.length > 0 ?action.payload.treeData : state["group"][0];
    duplicategroup [0].children.map((children, index) => {
    children['children].map((child, i) => {
    if (child['children'].length > 0) { 
      child['children'].map((grandChild, index) => { 
        if (grandChild.id === action.payload.currentNodeArray.id){
    child['children'].splice(index, 1); 
    return Object.assign({}, state, {
    group: duplicategroup
    });
    }
    });
    } else {
      if (child.id === action.payload.currentNodeArray.id) {
      children ['children].splice(i, 1); 
      return Object.assign({}, state, {
      group: duplicategroup
      });
    }

  }
});
});
}