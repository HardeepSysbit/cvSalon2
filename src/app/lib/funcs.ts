export class Funcs {
 
public static pad(num:number, size:number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  
  public static getMaxId(array) {
  return Math.max.apply(Math, array.map(function(o) { return o.id; }))
 
  }

}