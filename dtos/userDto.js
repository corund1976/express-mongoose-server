class UserDto {
  id;
  email;
  subscription;
  role;
  verified;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.subscription = model.subscription;
    this.role = model.role;
    this.verified = model.verified;
  }
}

export default UserDto