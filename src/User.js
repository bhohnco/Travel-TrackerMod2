class User {
  constructor(user) {
    if (user) {
      this.id = user.id || null;
      this.name = user.name || null;
      this.travelerType = user.travelerType || null;
    } else {
      this.id = null;
      this.name = "Guest"
    }
  }
}

export default User;