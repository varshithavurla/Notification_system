# Stage 1

## Core Actions Supported

1. Create Notification
2. Get All Notifications
3. Get Unread Notifications
4. Mark Notification as Read
5. Delete Notification
6. Filter Notifications by Type
7. Get Priority Notifications
8. Deliver Real-Time Notifications

## REST API Design

### 1. Create Notification

**Endpoint**

```http
POST /api/notifications
```

**Headers**

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

**Request Body**

```json
{
  "studentId": "1042",
  "type": "Placement",
  "message": "Amazon is hiring for SDE roles",
  "priority": "High"
}
```

**Response**

```json
{
  "notificationId": "uuid",
  "message": "Notification created successfully"
}
```

### 2. Get Notifications

```http
GET /api/notifications?studentId=1042&page=1&limit=20
```

**Response**

```json
{
  "notifications": [
    {
      "id": "uuid",
      "type": "Placement",
      "message": "Amazon hiring",
      "isRead": false,
      "createdAt": "2026-06-25T10:00:00Z"
    }
  ]
}
```

### 3. Mark Notification as Read

```http
PUT /api/notifications/{id}/read
```

### 4. Delete Notification

```http
DELETE /api/notifications/{id}
```

## Real-Time Notification Mechanism

WebSockets (Socket.IO) will be used for real-time notifications.

1. Student logs in.
2. Server pushes notifications instantly.
3. Frontend listens for new notification events and updates the UI in real time.
