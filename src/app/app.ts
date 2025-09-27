import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  age: number;
  country: string;
  mobile: string;
  gender: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  users: User[] = [];
  formData: Partial<User> = {};
  isEditing = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load initial data from db.json in assets
    this.http.get<{ users: User[] }>('assets/db.json').subscribe({
      next: (data) => this.users = data.users,
      error: (err) => console.error('Error loading db.json:', err)
    });
  }

  addUser() {
    if (!this.formData.name || !this.formData.age || !this.formData.country
        || !this.formData.mobile || !this.formData.gender
        || !this.formData.email || !this.formData.password) {
      alert('Please fill all fields');
      return;
    }

    const newUser: User = {
      id: this.users.length ? this.users[this.users.length - 1].id + 1 : 1,
      name: this.formData.name,
      age: Number(this.formData.age),
      country: this.formData.country,
      mobile: this.formData.mobile!,
      gender: this.formData.gender!,
      email: this.formData.email!,
      password: this.formData.password!
    };

    this.users.push(newUser);
    this.formData = {};
  }

  editUser(user: User) {
    this.isEditing = true;
    this.formData = { ...user };
  }

  updateUser() {
    if (!this.formData.name || !this.formData.age || !this.formData.country
        || !this.formData.mobile || !this.formData.gender
        || !this.formData.email || !this.formData.password) {
      alert('Please fill all fields');
      return;
    }

    this.users = this.users.map(u =>
      u.id === this.formData.id ? { ...u, ...this.formData } as User : u
    );
    this.isEditing = false;
    this.formData = {};
  }

  cancelEdit() {
    this.isEditing = false;
    this.formData = {};
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(u => u.id !== id);
      if (this.isEditing && this.formData.id === id) this.cancelEdit();
    }
  }
}
