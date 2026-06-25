const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YXJzaGl0aGF2dXJsYTdAZ21haWwuY29tIiwiZXhwIjoxNzgyMzc1ODM5LCJpYXQiOjE3ODIzNzQ5MzksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI4MzI2NmI3Ny1jMjkwLTRlMmItYTU3OC0wZDgzNTM1Y2VmMzIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJ2YXJzaGl0aGEgdnJsYSIsInN1YiI6IjgxYzA5MTg1LTY3MTctNDk3Yy1iY2QxLTdhZDNiYmE5YmJhZCJ9LCJlbWFpbCI6InZhcnNoaXRoYXZ1cmxhN0BnbWFpbC5jb20iLCJuYW1lIjoidmFyc2hpdGhhIHZybGEiLCJyb2xsTm8iOiIyM2IwMWE0MmM5IiwiYWNjZXNzQ29kZSI6ImFoWGp2cCIsImNsaWVudElEIjoiODFjMDkxODUtNjcxNy00OTdjLWJjZDEtN2FkM2JiYTliYmFkIiwiY2xpZW50U2VjcmV0IjoiVFNSVHVldFJDYUpxRVVVdCJ9.28O_k4a_Xf2WogYAKUMpQaxywYS19K5LnyICpA9YWTY";

async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

module.exports = Log;