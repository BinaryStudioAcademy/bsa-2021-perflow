String? userNameValidator(String? userName) {
  if(userName == null || userName.isEmpty) {
    return 'Invalid user name';
  }
  return null;
}

String? emailValidator(String? email) {
  if(email == null || email.isEmpty) {
    return 'Invalid email address';
  }
  return null;
}

String? passwordValidator(String? password) {
  if(password == null || password.isEmpty) {
    return 'Invalid password';
  }
  return null;
}

