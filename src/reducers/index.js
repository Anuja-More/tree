import {ADD_GROUP ,REMOVE_GROUP} from "../action-types"
const intialState ={
 group: [[
    {
      title: "section 1",
      expanded: true,
      type: "divison",
      divisonView: "h",
      children: [
        {
          title: "User Details",
          expanded: true,
          type: "section",
          headerView: "v",
          view: "form",
          children: [
            {
              title: "First Name",
              serviceKey: "firstName",
              subtitle: "",
              type: "field"
            },
            {
              title: "Last Name",
              subtitle: "",
              serviceKey: "lastName",
              type: "field"
            },
            {
              title: "Age",
              subtitle: "",
              serviceKey: "age",
              type: "field"
            },
            {
              title: "Blood Group",
              subtitle: "",
              serviceKey: "bloodGroup",
              type: "field"
            },
            {
              title: "DOB",
              subtitle: "",
              serviceKey: "dob",
              type: "field"
            },
            {
              title: "Phone Number",
              subtitle: "",
              serviceKey: "phoneNumber",
              type: "field"
            },
            {
              title: "E-mail",
              subtitle: "",
              type: "group",
              children: [
                {
                  title: "E-mail",
                  subtitle: "",
                  serviceKey: "email",
                  type: "field"
                }
              ]
            }
          ]
        },
        {
          expanded: true,
          title: "User Address Details",
          type: "section",
          view: "table",
          headerView: "v",
          children: [
            {
              title: "Address 1#",
              subtitle: "",
              serviceKey: "address1",
              type: "field"
            },
            {
              title: "Address 2#",
              subtitle: "",
              serviceKey: "address2",
              type: "field"
            },
            {
              title: "City",
              subtitle: "",
              serviceKey: "  ",
              type: "field"
            },
            {
              title: "Region",
              subtitle: "",
              serviceKey: "region",
              type: "field"
            },
            {
              title: "Country",
              subtitle: "",
              type: "group",
              children: [
                {
                  title: "ZIP Code",
                  serviceKey: "zipCode",
                  subtitle: "",
                  type: "field"
                }
              ]
            }
          ]
        },
        {
          title: "User Account Details",
          subtitle: "",
          headerView: "v",
          type: "section",
          view: "readonly",
          children: [
            {
              title: "Account NO",
              subtitle: "",
              serviceKey: "accountNo",
              type: "field"
            },
            {
              title: "Bank Name",
              subtitle: "",
              serviceKey: "bankName",
              type: "field"
            },
            {
              title: "Branch",
              subtitle: "",
              serviceKey: "branch",
              type: "field"
            },
            {
              title: "IFSC Code",
              subtitle: "",
              serviceKey: "ifscCode",
              type: "field"
            },
            {
              title: "Account Type",
              subtitle: "",
              serviceKey: "accountType",
              type: "field"
            },
            {
              title: "Customer ID",
              subtitle: "",
              serviceKey: "customerId",
              type: "field"
            }
          ]
        }
      ]
    },
    {
      title: "section 2",
      expanded: false,
      type: "divison",
      divisonView: "h",
      children: [
        {
          title: "User Details",
          expanded: true,
          type: "section",
          headerView: "v",
          view: "form",
          children: [
            {
              title: "First Name",
              serviceKey: "firstName",
              subtitle: "",
              type: "field"
            },
            {
              title: "Last Name",
              subtitle: "",
              serviceKey: "lastName",
              type: "field"
            },
            {
              title: "Age",
              subtitle: "",
              serviceKey: "age",
              type: "field"
            },
            {
              title: "Blood Group",
              subtitle: "",
              serviceKey: "bloodGroup",
              type: "field"
            },
            {
              title: "DOB",
              subtitle: "",
              serviceKey: "dob",
              type: "field"
            },
            {
              title: "Phone Number",
              subtitle: "",
              serviceKey: "phoneNumber",
              type: "field"
            },
            {
              title: "E-mail",
              subtitle: "",
              type: "group",
              children: [
                {
                  title: "E-mail",
                  subtitle: "",
                  serviceKey: "email",
                  type: "field"
                }
              ]
            }
          ]
        },
        {
          expanded: true,
          title: "User Address Details",
          type: "section",
          view: "table",
          headerView: "v",
          children: [
            {
              title: "Address 1#",
              subtitle: "",
              serviceKey: "address1",
              type: "field"
            },
            {
              title: "Address 2#",
              subtitle: "",
              serviceKey: "address2",
              type: "field"
            },
            {
              title: "City",
              subtitle: "",
              serviceKey: "  ",
              type: "field"
            },
            {
              title: "Region",
              subtitle: "",
              serviceKey: "region",
              type: "field"
            },
            {
              title: "Country",
              subtitle: "",
              type: "group",
              children: [
                {
                  title: "ZIP Code",
                  serviceKey: "zipCode",
                  subtitle: "",
                  type: "field"
                }
              ]
            }
          ]
        },
        {
          title: "User Account Details",
          subtitle: "",
          headerView: "v",
          type: "section",
          view: "readonly",
          children: [
            {
              title: "Account NO",
              subtitle: "",
              serviceKey: "accountNo",
              type: "field"
            },
            {
              title: "Bank Name",
              subtitle: "",
              serviceKey: "bankName",
              type: "field"
            },
            {
              title: "Branch",
              subtitle: "",
              serviceKey: "branch",
              type: "field"
            },
            {
              title: "IFSC Code",
              subtitle: "",
              serviceKey: "ifscCode",
              type: "field"
            },
            {
              title: "Account type",
              subtitle: "",
              serviceKey: "accountType",
              type: "field"
            },
            {
              title: "Customer ID",
              subtitle: "",
              serviceKey: "customerId",
              type: "field"
            }
          ]
        }
      ]
    }
  ]
  ]
};



function rootReducer(state = intialState, action){
if(action.type === ADD_GROUP){
  let duplicategroup;
  if (action.payload) {
  if (action.payload.treeData) {
  if (action.payload.treeData.length > 0) {
  duplicategroup = action.payload.treeData.length > 0  ? action.payload.treeData : state['group'][0];
  } else {
  duplicategroup = state['group'][0];
  
  
  } 
  } else {
  duplicategroup = state['group'][0]; 
  }
  }
  duplicategroup [0].children.map((children, index) => {
  if (children ['title'] === action.payload.currentNode) {
    { 
      console.log(children ['title'], action.payload.currentNode);
      children ['children'].push({
      id: 'C' + (children ['children'].length + 1), 
      title: action.payload.title? action.payload.titlev: null,
       children: [], 
       type: action.payload.inputType,
       nodeType: 'field'
      });
      return Object.assign ({}, state, {
      group: duplicategroup
      });
      }
    }else{
       children['childreh'].map((child, i) => {
          if (child.title === action.payload.currentNode) { 
            console.log(child); 
            console.log(children ['title'], 
            action.payload.currentNode);
          child['children']. push({
          id: C + (child['children'].length + 1), 
          title: action.payload.title? action.payload.title : null,
          children: [], 
          type: action.payload.inputType, nodeType: 'childField', 
          isDragable: true
          });
         return Object.assign({}, state, {
          group: duplicategroup
      });
    }
  });
}
  })
}
if

 