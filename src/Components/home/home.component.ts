import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { CreitcardDetailsService } from '../../Services/creitcard-details.service';
import { UserListService } from '../../Services/user-list.service';
import { LoginService } from '../../Services/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';


interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,PaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10; // Number of items per page
  totalItems: number = 0; // Total number of items (from the API)



  // Search
  searchTerm: string = '';
  isConflict: boolean = false;


  // Pagination
  pageChanged(event: any): void {
    this.currentPage = event;
    this.filterUsers(); // Apply filtering after page change
  }

  // Search
  searchUsers(): void {
    this.currentPage = 1; // Reset to first page when searching
    this.filterUsers();
  }

  filteredUsers:any
  // filterUsers(): void {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;

  //   this.filteredUsers = this.userListdata.filter((user: any) => {
  //     const searchStr = `${user.userName} ${user.role} ${user.email}`.toLowerCase(); // Corrected template literal syntax
  //     return searchStr.includes(this.searchTerm.toLowerCase());
  //   });
    

  //   this.filteredUsers = this.filteredUsers.slice(startIndex, endIndex); // Paginate the filtered results
  // }
  filterUsers(): void {
    // 1. Apply search filter (if a search term is entered)
    let filteredBySearch = this.userListdata; // Start with all data
  
    if (this.searchTerm) { // Only filter if there's a search term
      filteredBySearch = this.userListdata.filter((user: any) => {
        const searchStr = `${user.userName} ${user.role} ${user.email}`.toLowerCase();
        return searchStr.includes(this.searchTerm.toLowerCase());
      });
    }
  
    // 2. Paginate the filtered results
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  
    this.filteredUsers = filteredBySearch.slice(startIndex, endIndex);
  }


  isModalOpen = false; // Controls the modal visibility
  isPopupOpen = false;
  openEditCardModal(index: number) {
    this.selectedIndex = index;  // Store selected index
    this.isModalOpen = true;
    this.rowStates[index] = { isAdding: true, isConflict: false, errorMessage: '' }; // Set adding state and reset conflict
  }
  

  closeEditCardModal() {
    this.isModalOpen = false;
  }
  // isEditing: boolean = false;
  
  user = {
    username: '',
    email: '',
    password: '',
    role: 'user'
  };
  errorMessage: string = '';

  openPopup() {
    this.isPopupOpen = true;
  }

  editUser(selectedUser: any) {
    this.user = { ...selectedUser }; // Clone the object
    this.isEditing = true;
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }
  loginService1 = inject(LoginService)


  submitUser() {
    console.log('User Data:', this.user);
    // You can send this data to an API

    // Check if all fields are filled correctly
      if (!this.user.username || !this.user.email || !this.user.password) {
        this.errorMessage = 'Please fill in all fields correctly.';
        return;
      }

      // Call the LoginService to register the user
      this.loginService1.register(
        this.user.username,
        this.user.email,
        this.user.password,
        this.user.role
      ).subscribe({
        next: (response) => {
          console.log('Registration Successful:', response);
          
        },
        error: (error) => {
          console.error('Registration Failed:', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });

    this.closePopup();
  }
  
  @Input() username: string = '';

  router = inject(Router)

  OnLogout(){
    console.log("Button clicked")
    localStorage.removeItem('token');
    this.router.navigateByUrl('login')
    console.log("log out")
  }
  creditCardForm: FormGroup;

  CreditCardList:any

  creditCardServ = inject(CreitcardDetailsService)

  constructor(private fb: FormBuilder,private modalService: NgbModal) {

    
    // Initialize the form group with validation
    this.creditCardForm = this.fb.group({
      cardType: ['', Validators.required],
      cardNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{16}$/)] // Validates a 16 digit number
      ],
      cardHolder: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]], // Only alphabetic characters
      expiryDate: ['', Validators.required],
      cvv: [
        '',
        [Validators.required, Validators.pattern(/^\d{3}$/)] // Validates 3 digits for CVV
      ],
    
    });
  }

  userListdata:any
  userListServ = inject(UserListService)
  
  ngOnInit(): void {
    this.userListServ.getUserList().subscribe((res)=>{
      this.userListdata = res
      console.log("user data",this.userListdata)
      this.filterUsers();
      

    })
    
  }
  

  selectedIndex: number | null = null;

  rowStates: { [key: number]: { isAdding: boolean; isConflict: boolean; errorMessage: string } } = {};

  // OnSubmit function
  onSubmit(index: number | null) {
    if (index === null) return;  // Prevent errors if no row is selected
  
    if (this.creditCardForm.valid) {
      const formValues = this.creditCardForm.value;
      const formattedExpiryDate = formValues.expiryDate.substring(2, 7);
  
      const cardData = {
        CardId: 0,
        cardType: formValues.cardType,
        cardNumber: formValues.cardNumber,
        cardHolder: formValues.cardHolder,
        expiryDate: formattedExpiryDate,
        cvv: formValues.cvv
      };
  
      this.creditCardServ.addCard(
        cardData.CardId,
        cardData.cardType,
        cardData.cardNumber,
        cardData.cardHolder,
        cardData.expiryDate,
        cardData.cvv
      ).subscribe({
        next: (res) => {
          this.rowStates[index] = { isAdding: false, isConflict: false, errorMessage: '' };
          console.log('Card added successfully:', res);
        },
        error: (err) => {
          if (err.status === 409) {
            this.rowStates[index] = {
              isAdding: false,
              isConflict: true,
              errorMessage: err.error?.message || 'Conflict occurred.'
            };
          }
          console.error('Error adding card:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  
  


  Id:string = ''

  UpdateRecord(){

    this.Id = this.userListdata.id

    console.log("Update id",this.Id)


  }

  

  editData: any = null;  // Store the data for editing
  isEditing: boolean = false; // Flag to indicate if we're in edit mode
  deleteData: any = null;
 
  openEditModal(content: any, user: any) { // content is the modal template

   
    this.editData = { ...user }; // Clone data to prevent direct mutation
    console.log("from edit modal",this.editData)
    this.isEditing = true;
    this.modalService.open(content);
  }

  // Open the delete confirmation modal
  openDeleteModal(deleteModalTemplate: any, user: any) {
    this.deleteData = { ...user }; // Clone user data to avoid direct modification
    console.log(this.deleteData)
    if (deleteModalTemplate) {
      this.modalService.open(deleteModalTemplate, { centered: true, backdrop: 'static' });
    } else {
      console.error("Delete modal template is not defined.");
    }
  }

// Confirm and delete the user
confirmDelete() {
  if (this.deleteData) {
    const idToDelete = this.deleteData.id; // Store the ID before the API call

    console.log("from delete ", idToDelete); // Use the stored ID

    console.log("Delete data is",this.userListServ)

    this.userListServ.deleteUser(idToDelete).subscribe({
      next: () => {
        // Now use the stored ID to filter the data (if needed)
        this.userListdata = this.userListdata.filter((u: { id: any }) => u.id !== idToDelete);
        alert("User deleted successfully!");
        this.closeModal();
        this.deleteData = null; // Reset deleteData after successful deletion.
      },
      error: (err) => {
        console.error("Error deleting user:", err);
        alert("Failed to delete user. Please try again.");
      }
    });
  }
}

  saveChanges() {
    if (this.editData) {
      // Find the index of the user being edited
      const index = this.userListdata.findIndex((u: { id: any; }) => u.id === this.editData.id);
      if (index !== -1) {
        this.userListdata[index] = { ...this.editData }; // Update data
        
        this.userListServ.updateUser(this.userListdata[index]).subscribe({
          next: (res) => {
            alert("User updated successfully!"); // Replace this with a proper success message box
            this.closePopup(); // Call function to close popup
          },
          error: (err) => {
            console.error("Error updating user:", err);
            alert("Failed to update user. Please try again.");
          }
        });
      }
      this.modalService.dismissAll(); // Close modal
      this.isEditing = false;
    }
  }

  closeModal() {
    this.isEditing = false; // Set isEditing to false
    this.editData = null; // Clear editData
    this.modalService.dismissAll(); // Close the modal
}




openDeleteCardModal(){

}
}

  

  
  


