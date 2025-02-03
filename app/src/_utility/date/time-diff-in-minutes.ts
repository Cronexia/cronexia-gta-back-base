// * Compare 2 times and return the result in minutes.
export function timeDiffInMinutes(timeStart, timeEnd) {
  // console.log('timeDiffInMinutes() > timeStart - timeEnd');
  // console.log(timeStart); //'16:30:00.000Z'

  const timeStartSplit = timeStart.split(':'); // ['16', '30', '00.000Z']
  const timeStartInMn =
    parseInt(timeStartSplit[0]) * 60 + parseInt(timeStartSplit[1]); //  16 x 60 + 30
  // console.log('timeStartInMn : ', timeStartInMn);

  // console.log(timeEnd);
  const timeEndSplit = timeEnd.split(':');
  const timeEndInMn =
    parseInt(timeEndSplit[0]) * 60 + parseInt(timeEndSplit[1]);
  // console.log('timeEndInMn : ', timeEndInMn);

  // console.log('timeEndInMn - timeStartInMn');
  // console.log(timeEndInMn - timeStartInMn);
  // console.log('/timeDiffInMinutes()');
  return timeEndInMn - timeStartInMn;
}
