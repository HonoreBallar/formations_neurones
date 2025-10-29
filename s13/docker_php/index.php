<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    echo "Hello, " . $name . "!";
}
if (isset($_POST['date'])) {
    $date = $_POST['date'];
    echo "<br>You selected the date and time: " . htmlspecialchars($date);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="" method="post">
        <input type="text" name="name" placeholder="Enter your name">
        <input type="datetime" name="date" id="date">
        <input type="submit" value="Submit">
    </form>
</body>
</html>
