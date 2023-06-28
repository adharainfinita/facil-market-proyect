

export const formatTime = (data: string) =>{
  //Obtengo la fecha de creación
  let dataToFormat = data.split(' ');
  let date = dataToFormat[0].split('-');
  let time = dataToFormat[1].split(':');
  const regex = /,/g

  const dateObject = {
    resume: date.toString().replace(regex, '-'),
    day: date[0],
    year: date[1],
    month: date[2],
  };

  const timeObject = {
    resume: time.toString().replace(regex, '-'),
    hour: time[0],
    minutes: time[1],
    seconds: time[2]
  }

  return {dateObject, timeObject};
}