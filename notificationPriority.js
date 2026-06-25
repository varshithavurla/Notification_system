const axios = require("axios");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YXJzaGl0aGF2dXJsYTdAZ21haWwuY29tIiwiZXhwIjoxNzgyMzc4OTY1LCJpYXQiOjE3ODIzNzgwNjUsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkNGNmY2FlZC1hMjNkLTRkOGQtOWU1Zi03ZDI2MTRiMjI2NDEiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJ2YXJzaGl0aGEgdnJsYSIsInN1YiI6IjgxYzA5MTg1LTY3MTctNDk3Yy1iY2QxLTdhZDNiYmE5YmJhZCJ9LCJlbWFpbCI6InZhcnNoaXRoYXZ1cmxhN0BnbWFpbC5jb20iLCJuYW1lIjoidmFyc2hpdGhhIHZybGEiLCJyb2xsTm8iOiIyM2IwMWE0MmM5IiwiYWNjZXNzQ29kZSI6ImFoWGp2cCIsImNsaWVudElEIjoiODFjMDkxODUtNjcxNy00OTdjLWJjZDEtN2FkM2JiYTliYmFkIiwiY2xpZW50U2VjcmV0IjoiVFNSVHVldFJDYUpxRVVVdCJ9.5V_j18BRxWaGE880zTRFka_GuCEKZ0i7kuyxwqoawBY"
const weights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getTopNotifications() {
  try {
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const notifications = response.data.notifications;

    notifications.sort((a, b) => {
      if (weights[b.Type] !== weights[a.Type]) {
        return weights[b.Type] - weights[a.Type];
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = notifications.slice(0, 10);

    console.log("TOP 10 PRIORITY NOTIFICATIONS\n");

    top10.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.Type} - ${item.Message} (${item.Timestamp})`
      );
    });
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

getTopNotifications();