
const tableKey ='contact-table';
     let clearBtn = document.getElementById('clearBtn');
     clearBtn.addEventListener('click', () => {
        localStorage.removeItem(tableKey);
     });

let contactTable;
let contactTableDemo ={
        'Adams': {
            'phone': '047-805-6832',
            'address':'123 Clarton Avenue, NSW,2345'
        },
        'Adams2': {
            'phone': '047-563-0452',
            'address':'1223 Mary Avenue, NSW,2545'
        }
};

let enableDisableNameInput = (option) => {
    let newPersonName = document.getElementById('newPersonName');
    if(option === 'enable')
    newPersonName.disabled = false;
    else if (option === 'disable')
    newPersonName.disabled = true;
 // refreshDOMTable();
} 

let refreshDOMTable =() => {

    //contactTable = contactTableDemo;
    let contactTableKeys = Object.keys(contactTable);
    let tableContainer = document.getElementById('contactTableContainer');
    let oldTableBody = document.getElementById('tableBody');
    
    tableContainer.removeChild(oldTableBody);
    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';
    tableContainer.appendChild(newTableBody);

    for(let i = 0; i< contactTableKeys.length; i++){
        let currentRow = document.createElement('div');
        let currentNameCol = document.createElement('div');
        let currentPhoneCol = document.createElement('div');
        let currentAddressCol = document.createElement('div');
        let currentEditBtn = document.createElement('div');
        let currentDeleteBtn = document.createElement('div');
        currentRow.className = 'contact-table-row';
        currentNameCol.className = 'contact-table-column contact-name';
        currentPhoneCol.className= 'contact-table-column contact-phone';
        currentAddressCol.className= 'contact-table-column contact-address';
        currentEditBtn.className = 'contact-table-column contact-edit';
        currentDeleteBtn.className= 'contact-table-column contact-delete';
        currentNameCol.innerHTML = contactTableKeys[i];
        currentPhoneCol.innerHTML = contactTable[contactTableKeys[i]].phone;
        currentAddressCol.innerHTML = contactTable[contactTableKeys[i]].address;
        currentEditBtn.innerHTML = '<i class="fa fa-edit" style="font-size:20px"></i>';
        currentDeleteBtn.innerHTML = '<i class="fa fa-trash-o" style="font-size:24px"></i>';   
        currentRow.appendChild(currentNameCol);
        currentRow.appendChild(currentPhoneCol);
        currentRow.appendChild(currentAddressCol);
        currentRow.appendChild(currentEditBtn);
        currentRow.appendChild(currentDeleteBtn);
        newTableBody.appendChild(currentRow);
    }
    let enableDisableNewUserModal = (option) => {
        let newPersonName = document.getElementById('newPersonName');
        let newPersonPhone = document.getElementById('newPersonPhone');
        let newPersonAddress = document.getElementById('newPersonAddress');
    
        newPersonName.value = '';
        newPersonPhone.value = '';
        newPersonAddress.value = '';
         
        let newPersonModal = document.getElementById('newPersonModal');
        let backdrop = document.getElementById('backdrop');
    
        newPersonModal.className = `${option}-modal`;
        backdrop.className = `${option}-modal`;
    
    }
    let addNewEntryBtn = document.getElementById('contactAddNewEntry');
    let editBtns = document.getElementsByClassName('contact-edit');
    let deleteBtns = document.getElementsByClassName('contact-delete');
    let newPersonSubmitBtn = document.getElementById('newPersonSubmitBtn');
    let newPersonCancelBtn = document.getElementById('newPersonCancelBtn');
    newPersonSubmitBtn.addEventListener('click',() =>{
        let newPersonName = document.getElementById('newPersonName').value.trim();
        let newPersonPhone = document.getElementById('newPersonPhone').value.trim();
        let newPersonAddress = document.getElementById('newPersonAddress').value.trim();
        if(newPersonName === '')
            document.getElementById('newPersonName').className = 'input-err';
               else document.getElementById('newPersonName').className = '';
        if(newPersonPhone === '')
            document.getElementById('newPersonPhone').className = 'input-err';
                else document.getElementById('newPersonPhone').className= '';
        if(newPersonAddress === '')
            document.getElementById('newPersonAddress').className = 'input-err';
                else document.getElementById('newPersonAddress').className = '';
        if(newPersonName !== '' && newPersonPhone !== '' && newPersonAddress !== ''){
                let newPerson = {};
                    contactTable[newPersonName] = {
                    'phone' : newPersonPhone,
                    'address': newPersonAddress
                     }
                    localStorage.setItem(tableKey, JSON.stringify(contactTable));
                    enableDisableNewUserModal('disable');
                    refreshDOMTable();
       }
    })
         newPersonCancelBtn.addEventListener('click', () => {
        enableDisableNewUserModal('disable');
        })   
        addNewEntryBtn.addEventListener('click', () => {
        enableDisableNewUserModal('enable');
        })
    for(let i=0; i < editBtns.length; i++){
        editBtns[i].addEventListener('click', ($event) =>  {
        let nameToEdit = $event.target.parentElement.children[0].innerText;
        let personToEdit = contactTable[nameToEdit];
        enableDisableNewUserModal('enable');
        let newPersonName = document.getElementById('newPersonName');
        let newPersonPhone = document.getElementById('newPersonPhone');
        let newPersonAddress = document.getElementById('newPersonAddress');
        newPersonName.value = nameToEdit;
        newPersonPhone.value = personToEdit.phone;
        newPersonAddress.value = personToEdit.address;
        enableDisableNameInput('disable');
        })
    }
    for(let i = 0; i< deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click',($event) => {
        let nameToDelete = $event.target.parentElement.children[0].innerText;
        let isSure = window.confirm('Are you sure you want to delete ' + nameToDelete + '?  ');
        if(isSure)
        deleteUserFromTable(nameToDelete);
        })
    }
    
}
//refreshDOMTable();
let deleteUserFromTable = (userName) => {

    let tempTable ={};
    let contactTableKeys = Object.keys(contactTable);
    for (let i = 0; i< contactTableKeys.length; i++) {
        if(userName !== contactTableKeys[i]){
        tempTable[contactTableKeys[i]] = contactTable[contactTableKeys[i]];
         }
    }
    contactTable = tempTable;
    localStorage.setItem(tableKey, JSON.stringify(contactTable));
   refreshDOMTable();
}
//refreshDOMTable();
let init = () => {
    if (localStorage.getItem(tableKey)){
    contactTable = JSON.parse(localStorage.getItem(tableKey));
    } else {
    contactTable = contactTableDemo;
    localStorage.setItem(tableKey, JSON.stringify(contactTable));
    }
refreshDOMTable();
}
init();


     

        