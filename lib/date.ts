const formatDate = (dateString: string): string => {
  if (!dateString || typeof dateString !== 'string') {
    return '--.--.--';
  }
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return '--.--.--';
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default formatDate;
