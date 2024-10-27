// User Class
class User {
  constructor(
    email,
    password,
    name = null,
    picture = null,
    role = "user",
    enabled = true,
    address = null
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.picture = picture;
    this.role = role;
    this.enabled = enabled;
    this.address = address;
  }
}


export default User;