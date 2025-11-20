export function formatToBrazilianDate(isoDateString: string): string {

    if(!isoDateString){
      return "";
    }

    const date = new Date(isoDateString);
    

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
    }
  

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  
  
