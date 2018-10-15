import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape, each } from '@microsoft/sp-lodash-subset';

import styles from './RatingWebPart.module.scss';
import * as strings from 'RatingWebPartStrings';

import * as $ from "jquery";
window["$"] = $;
window["jQuery"] = $;

import * as pnp from "sp-pnp-js";
import { SPComponentLoader } from '@microsoft/sp-loader';
import { extractWebUrl } from 'sp-pnp-js/lib/utils/util';
import {  UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import * as moment from "moment";

require('./app/rateyo.js');

export interface IRatingWebPartProps {
  description: string;
}
require('./app/style.css');
var mythis: any;
var webUrl:string;
var launchpadLstName="LPTiles";
var tileid;
var KeyColor;
var BarColor;
var SecColor;
var bootstrapCount=0;

export default class RatingWebPart extends BaseClientSideWebPart<IRatingWebPartProps> {

  public constructor() {
    super();
    SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/rateYo/2.3.2/jquery.rateyo.min.css');
  }

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {

      pnp.setup({
        spfxContext: this.context
      });

    });
  }

  public getDataFromList(): void {
    pnp.sp.web.lists.getByTitle("LPComments").items.select("*", "Tile/Title", "CommentContent","CommentFrom/Title","CommentFrom/Id","CommentFrom/Name","CommentFrom/EMail").filter("Title eq 'Rate' and TileId eq '"+tileid+"'").expand("Tile","CommentFrom/Id","CommentFrom/Id").orderBy('Created',false).get().then(function (result) {

      //console.log(JSON.stringify(result));
      mythis.getRaterImg(result);
    }, function (er) {
      alert("Oops, Something went wrong, Please try after sometime");
      console.log("Error:" + er);
    });
  }

  public getDataFromLaunchpad(): void {
    
    
    pnp.sp.web.lists.getByTitle(launchpadLstName).items.select("*").filter("ID eq '"+tileid+"'").get().then(function (result) {
      if(result.length != 0)
      {
        var avgCount=result[0].AverageRating;
        var rateCount=result[0].RatingCount;
        $('#allReview').append('<span class="avgRating">'+(avgCount?avgCount.toFixed(1):"")+'</span><span id="rate"></span><span class="rateCount"><i class="fa fa-user" aria-hidden="true"></i><span>'
        +(rateCount?rateCount:0)+' total</span></span>');
    
        $('#rate').rateYo({
          rating: avgCount?avgCount.toFixed(1):0, 
          starWidth:"20px",
          readOnly: true,
          ratedFill:KeyColor?KeyColor:""
        });
      }

    }, function (er) {
      alert("Oops, Something went wrong, Please try after sometime");
      console.log("Error:" + er);
    });
  }

  public getRaterImg(data){
    var ratingHTML="";

    data.forEach(val => {
      var raterEmail = val.CommentFrom.EMail;
      var userName = val.CommentFrom.Title;
      var comment = val.CommentContent;
      var dt = new Date(val.Modified);
      var date = moment(dt).format('MMMM DD, YYYY');
      var img = webUrl + "/_layouts/15/userphoto.aspx?size=L&username="+raterEmail;
      ratingHTML =  '		<li>'+
      '		<div class="userImg col-xs-1"><img src="'+img+'" alt="image"></div>'+
      '		<div class="reviewSection col-xs-11">'+
      '			<span class="name">'+userName+'</span>'+
      '			<span style="color:'+(KeyColor?KeyColor:"")+'">'+date+'</span>'+
      '			<span  class="msgComment">'+comment+'</span>'+(comment.length > 70?'<button class="btnFullReview" type="button">Full Review</button>':'')
      '		</div>'+
      '		</li>';
        
            
      $('#user-list').append(ratingHTML);
    });
  }

  public render(): void {
    
    mythis = this;
    webUrl = this.context.pageContext.site.absoluteUrl;
    console.log(webUrl);
    var queryParameters = new UrlQueryParameterCollection(window.location.href);
     tileid = queryParameters.getValue("tileid");

     this.domElement.innerHTML = '<div class="container-fluide reviewMainSection">'+
    '<div class="row">'+
    '<h3>REVIEWS</h3><div id="allReview"></div>'+
    '</div>'+
    '<div class="row" id="ratingData">'+
    '<ul id="user-list" class="loaded"></il>'+
   '</div>'+
    '</div>';

      this.getThemeColors();

      $(document).click(function(e){
          if($(e.target).hasClass('btnFullReview'))
          {
            $('.msgComment').removeClass('msgExpand');
            $(e.target).siblings('.msgComment').addClass('msgExpand');
          }
          else
          {
            $('.msgComment').removeClass('msgExpand');
          }
      })
  }

  public getThemeColors(): void {
    pnp.sp.web.lists.getByTitle("Site Branding").items.select("Title","Color").get().then(function (result) {
      result.forEach(function(item,index){
            item.Title == "Key Color"?KeyColor = item.Color:item.Title == "Bar Color"?BarColor = item.Color:SecColor = item.Color;
      })
      mythis.getDataFromLaunchpad();
      mythis.getDataFromList();
      
    }, function (er) {
      console.log("Error:" + er);
      mythis.getDataFromLaunchpad();
      mythis.getDataFromList();
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
