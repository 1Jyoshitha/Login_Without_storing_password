

 **Login Without Storing Password**

## Overview
The **Login Without Storing Password** system provides a secure login method that does not store user passwords in the database. Instead, it uses **Zero-Knowledge Proof (ZKP)** to authenticate users while ensuring their sensitive data, such as passwords, are never saved or transmitted. This approach enhances security by preventing unauthorized access to stored credentials.

This project is ideal for scenarios where high privacy and security are required for user authentication.

## Features
- **Zero-Knowledge Proof (ZKP) Authentication**: Users authenticate themselves using a cryptographic protocol without transmitting or storing passwords.
- **Secure Login**: No passwords are stored in the system, ensuring that there’s no risk of password theft from the database.
- **Easy Integration**: Can be easily integrated into existing login systems to improve security and privacy.

## Installation
Follow these steps to set up the **Login Without Storing Password** project:

1. Clone the repository:
   ```bash
   git clone https://github.com/1Jyoshitha/Login_Without_storing_password.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Login_Without_storing_password
   ```

3. Install dependencies (if applicable, specify the installation command for the relevant environment):
   ```bash
   npm install
   ```

4. Start the application (if there’s a specific command to run the application):
   ```bash
   npm start
   ```

## Usage
- **User Registration**: Users can sign up by providing a username. The system will store a hashed value that does not represent their actual password.
- **User Login**: During login, users authenticate using Zero-Knowledge Proof (ZKP). This ensures that their actual password is never shared or stored.
- **Authentication**: Upon successful authentication, users are granted access without ever having their passwords stored.

For additional details, please refer to the code inside the repository and the instructions on the specific Zero-Knowledge Proof mechanism used.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add feature'`).
4. Push the changes to your fork (`git push origin feature-name`).
5. Open a pull request to merge your changes.
```
