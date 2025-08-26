import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-competition-registration',
  templateUrl: './competition-registration.component.html',
  styleUrls: ['./competition-registration.component.css'],
  standalone: false,
})
export class CompetitionRegistrationComponent implements OnInit {
  // Add your component logic here
  registrationForm!: FormGroup;
  competitions: any[] = [];
  message: string = '';
  apiUrl: string = 'https://localhost:7241/api'; // Adjust the URL as needed

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      studentName: ['', Validators.required],
      schoolName: ['', Validators.required],
      competitionId: ['', Validators.required]
    });

    this.http.get<any[]>(`${this.apiUrl}/competitions`)
      .subscribe(data => this.competitions = data);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.http.post(`${this.apiUrl}/registrations`, this.registrationForm.value)
        .subscribe({
          next: (res) => {
            this.message = 'Pendaftaran berhasil!';
            this.registrationForm.reset();
          },
          error: err => {
            this.message = err.error || 'Pendaftaran gagal.';
          }
        });
    } else {
      this.message = 'Lengkapi semua data!';
    }
  }
}
