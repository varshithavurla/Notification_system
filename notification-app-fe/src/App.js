import { useEffect, useState } from "react";
import { TOKEN } from "./config";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import { Log } from "./logger";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [topN, setTopN] = useState(10);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YXJzaGl0aGF2dXJsYTdAZ21haWwuY29tIiwiZXhwIjoxNzgyMzgzNjkyLCJpYXQiOjE3ODIzODI3OTIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzMzhkMmFkNy1iNGFmLTQ1ZDctOWIxMi00MmUxOTY2N2Q3OGUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJ2YXJzaGl0aGEgdnJsYSIsInN1YiI6IjgxYzA5MTg1LTY3MTctNDk3Yy1iY2QxLTdhZDNiYmE5YmJhZCJ9LCJlbWFpbCI6InZhcnNoaXRoYXZ1cmxhN0BnbWFpbC5jb20iLCJuYW1lIjoidmFyc2hpdGhhIHZybGEiLCJyb2xsTm8iOiIyM2IwMWE0MmM5IiwiYWNjZXNzQ29kZSI6ImFoWGp2cCIsImNsaWVudElEIjoiODFjMDkxODUtNjcxNy00OTdjLWJjZDEtN2FkM2JiYTliYmFkIiwiY2xpZW50U2VjcmV0IjoiVFNSVHVldFJDYUpxRVVVdCJ9.r1Df0e_GPkxgdz1qQCbCOP3tK8sLIGcTspM1aEyUbDs";

  const weights = {
    Placement: 3,
    Result: 2,
    Event: 1
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      Log("info", "api", "Fetching notifications");
      const response = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("API Response:", response.data);

      const data = response.data.notifications.map((item) => ({
        ...item,
        viewed: false
      }));

      setNotifications(data);
      console.log("Notifications Count:", data.length);
      console.log("Loaded:", data.length);
    } catch (error) {
  console.log("ERROR:", error);
  console.log("ERROR RESPONSE:", error.response);
}
  };
  

  const markAsViewed = (id) => {
    const updated = notifications.map((n) =>
      n.ID === id ? { ...n, viewed: true } : n
    );

    setNotifications(updated);
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.Type === filter);

  const priorityNotifications = [...filteredNotifications]
    .sort((a, b) => {
      if (weights[b.Type] !== weights[a.Type]) {
        return weights[b.Type] - weights[a.Type];
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, topN);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Campus Notifications
      </Typography>

      <FormControl sx={{ minWidth: 200, mr: 2 }}>
        <InputLabel>Filter</InputLabel>

        <Select
          value={filter}
          label="Filter"
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Top N</InputLabel>

        <Select
          value={topN}
          label="Top N"
          onChange={(e) => setTopN(e.target.value)}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Priority Notifications
      </Typography>

      <Grid container spacing={2}>
        {priorityNotifications.map((item) => (
          <Grid xs={12} md={6} key={item.ID}>
            <Card
              sx={{
                backgroundColor: item.viewed ? "#f5f5f5" : "#d1ffd6"
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {item.Type}
                </Typography>

                <Typography>
                  {item.Message}
                </Typography>

                <Typography>
                  {item.Timestamp}
                </Typography>

                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={() => markAsViewed(item.ID)}
                >
                  Mark Viewed
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;