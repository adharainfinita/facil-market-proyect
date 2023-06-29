

export const formatTime = (data: string) =>{
  //Obtengo la fecha de creación
  let dataToFormat = data.split(' ');
  let date = dataToFormat[0].split('-');
  let time = dataToFormat[1].split(':');
  const regex = /,/g

  const dateObject = {
    resume: date.toString().replace(regex, '-'),
    day: Number(date[0]),
    month: Number(date[1]),
    year: Number(date[2]),
  };

  const timeObject = {
    resume: time.toString().replace(regex, '-'),
    hour: Number(time[0]),
    minutes: Number(time[1]),
    seconds: Number(time[2])
  }

  return {dateObject, timeObject};
}