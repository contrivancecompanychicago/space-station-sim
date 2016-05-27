let idCounter = new Date().getTime(); //start from a seed based on time
export default function uniqid(){
  return idCounter++;
}
