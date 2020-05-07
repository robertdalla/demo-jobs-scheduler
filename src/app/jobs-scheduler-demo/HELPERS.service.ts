/*****************************************************
 * This service provides some various helper features.
 *****/

// angular core
import { Injectable } from '@angular/core';

@Injectable()
export class HELPERSService {

    constructor(

    ) {
    }

  /****************
   * @name isNumber
   * @description  Check if value is a number
   * @param n
   * @returns boolean
   */
    public isNumber(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

  /*************
   * @name isURL
   * @description  Check if string is a valid URL. If noDomain = true then a valid URL does not need to have a domain. eg: https://tableau/t/Powerlink/views
   * @param str
   * @param noDomain
   * @returns boolean
   */
    public isURL(str: string, noDomain: boolean) {
      if (noDomain === true) {
        return  /^(?:\w+:)?\/\/([^\s\]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(str);
      } else { return  /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(str); }
    }

  /***********************
   * @name getUrlParameter
   * @description  Get a particular url query string parameter. eg: getUrlParameter('tab') will return 'overall' or null
   * @param name
   * @returns string
   */
    public getUrlParameter(name: string) {
        // console.log('checked param name: ' + name);
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const test = regex.exec(document.location.href);
        const result = test === null ? null : decodeURIComponent(test[1].replace(/\+/g, ' '));
        // console.log('checked param value: ' + result);
        return result;
    }

  /***************
   * @name NumDate
   * @description  Convert an ISO date into a numerical date that can be arithmetically manipulated.
   * @param ISOdate
   * @returns number
   */
  public NumDate(ISOdate: string) {
    const JSdate = new Date(ISOdate);
    return JSdate.getTime();
  }

  /***************
   * @name getTodayDate
   * @description  Today's date with time to 0h 0mn 0s 0ms
   * @returns date object
   */
  public getTodayDate() {
    return new Date(new Date().setHours(0, 0, 0, 0)); // Today's date with time to 0h 0mn 0s 1ms
  }

}
