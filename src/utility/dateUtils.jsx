export function formatDate(timestamp) {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Format time in 12-hour format
  };

  const date = new Date(timestamp);
  const formattedDateTime = date.toLocaleDateString('en-US', options);
  
  const timeElapsed = getTimeElapsed(timestamp); // Calculate time elapsed
  const timeElapsedString = formatTimeElapsed(timeElapsed);

  return `Created on ${formattedDateTime} (${timeElapsedString})`;
}

function getTimeElapsed(timestamp) {
  const currentTime = new Date().getTime();
  const updatedTime = new Date(timestamp).getTime();
  return currentTime - updatedTime; // Time elapsed in milliseconds
}

function formatTimeElapsed(timeElapsed) {
  const seconds = Math.floor(timeElapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  if (seconds > 0) {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}
