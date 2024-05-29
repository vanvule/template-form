# Project Name

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Data Storage](#data-storage)

## Introduction

This project is a web application that uses dynamic template forms, where all form configurations are imported from JSON files. The data entered into the forms is stored in IndexedDB for persistent storage. The application is built using modern web technologies to ensure a robust and scalable architecture.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing to the language.
- **Material-UI (MUI)**: A popular React UI framework for building responsive, accessible, and customizable web applications.
- **IndexedDB**: A low-level API for client-side storage of significant amounts of structured data, including files/blobs.
- **Yarn**: A package manager that doubles down as project manager.

## Getting Started

Follow these steps to clone the project repository, install dependencies, and run the project locally.

### 1. Clone the Source Code

Clone the repository from GitHub using the following command:
```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. Install Dependencies

Clone the repository from GitHub using the following command:
```bash
yarn install
```

### 3. Start the Project
Start the development server and open the application in your browser:

```bash
yarn start
```
Open http://localhost:3000 to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

## Project Structure

The project structure is organized to keep the code modular, maintainable, and scalable.
```bash
your-project/
│
├── public/                   # Static files
│
├── src/                      # Source files
│   ├── components/           # Reusable components
│   ├── configure/            # Configuration files (JSON)
│   ├── store/                # IndexedDB methods and logic
│   ├── styles/               # CSS and SCSS files
│   ├── App.tsx               # Main App component
│   └── index.tsx             # Entry point for React
│
├── .gitignore                # Git ignore file
├── package.json              # Project dependencies and scripts
├── README.md                 # Project documentation
└── yarn.lock                 # Yarn lock file

```

### Data Storage
Data in this project is stored in IndexedDB, allowing for persistent client-side storage. The IndexedDB methods are defined in the store directory.

### Configuration
All template form configurations are imported from JSON files located in the configure directory. These JSON files define the structure and behavior of the forms.

### IndexedDB Methods
The methods for interacting with IndexedDB are defined in the store directory. These methods handle operations such as adding, updating, retrieving, and deleting records in the database.

## Functions:

### 1. The “Policy” form:

#### Step1: Insured Objects”: displays a list of insured objects of the policy.
Functions:
Search insured objects by their names.
Add new insured object: when clicking on the “ADD” button, it will show the “Insured Object Detail” form with blank data.
Edit an insured object: when clicking on insured objects’ name, it will show the “Insured Object Detail” form with selected data.

<img width="1419" alt="image" src="https://github.com/vanvule/template-form/assets/61262843/159f5ab4-03c7-4d0c-b521-a27ca3d3b61f">

#### Step 2: Buyer Information”: displays a form for users to enter information about the buyer.
Functions:
Enter values of buyer
Fields validations are triggered according to the configuration file

<img width="1419" alt="image" src="https://github.com/vanvule/template-form/assets/61262843/c144e817-6c34-49ea-a521-c25785312150">

#### Step 3: Done”: displays an success alert with following information:
Message: “New Insurance Policy Registration Successfully!!!”
Text: “Total fee of the policy is: $1100” whereas $1100 is the total fee of the policy.

<img width="1419" alt="image" src="https://github.com/vanvule/template-form/assets/61262843/93dbbd5b-4045-4402-9026-219d466af4a6">

### The “Insured Object Detail” form:
#### Step1: Insured Object Information”: displays a form for users to enter details of the selected insured object.
Functions:
Enter values of buyer
Fields validations are triggered according to the configuration file


#### Step 2: Buyer Information”: displays a form for users to choose insurance packages and its effective dates.
Functions:
There are 3 packages:
Golden costs $500
Silver costs $300
Bronze costs $150
If the age of insured objects is under 16, the fee will be free (Zero cost).
Each package has different benefits which can be configured in the configuration file.
There 2 types of benefits:
Mandatory benefits: Users cannot adjust mandatory benefits.
Additional benefits: Users can pick which benefits they want. Each one has different pricing. 
If the insured objects are under 16-age, they also have to pay for additional benefits.















