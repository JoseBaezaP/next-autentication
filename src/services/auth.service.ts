export class AuthService {
  async login(email: string, password: string): Promise<{ token: string }> {
    const res = await fetch("http://localhost:3001/api/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw data.message;
    }
    return data;
  }
}

const AuthServiceController = new AuthService();
export default AuthServiceController;
