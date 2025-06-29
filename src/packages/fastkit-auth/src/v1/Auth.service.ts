class AuthService {
  async login(email: string, password: string) {
    // Implement login logic
  }

  async signup(email: string, password: string) {
    // Implement signup logic
  }

  async logout(userId: string) {
    // Implement logout logic
  }

  async forgotPassword(email: string) {
    // Implement forgot password logic
  }
}

export default new AuthService();
export { AuthService };