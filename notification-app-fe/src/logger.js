import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YXJzaGl0aGF2dXJsYTdAZ21haWwuY29tIiwiZXhwIjoxNzgyMzgzNjkyLCJpYXQiOjE3ODIzODI3OTIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzMzhkMmFkNy1iNGFmLTQ1ZDctOWIxMi00MmUxOTY2N2Q3OGUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJ2YXJzaGl0aGEgdnJsYSIsInN1YiI6IjgxYzA5MTg1LTY3MTctNDk3Yy1iY2QxLTdhZDNiYmE5YmJhZCJ9LCJlbWFpbCI6InZhcnNoaXRoYXZ1cmxhN0BnbWFpbC5jb20iLCJuYW1lIjoidmFyc2hpdGhhIHZybGEiLCJyb2xsTm8iOiIyM2IwMWE0MmM5IiwiYWNjZXNzQ29kZSI6ImFoWGp2cCIsImNsaWVudElEIjoiODFjMDkxODUtNjcxNy00OTdjLWJjZDEtN2FkM2JiYTliYmFkIiwiY2xpZW50U2VjcmV0IjoiVFNSVHVldFJDYUpxRVVVdCJ9.r1Df0e_GPkxgdz1qQCbCOP3tK8sLIGcTspM1aEyUbDs";

export const Log = async (level, pkg, message) => {
  try {
    await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack: "frontend",
        level: level,
        package: pkg,
        message: message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (err) {}
};