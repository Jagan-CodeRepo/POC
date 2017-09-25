import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorld.module.scss';
import * as strings from 'helloWorldStrings';
import { IHelloWorldWebPartProps } from './IHelloWorldWebPartProps';
import * as angular from 'angular';
import 'chart.js';
import 'angular-chart.js';
// const jsChart=require("jsChart");
// const angularjsChart=require("angularjsChart");
export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.helloWorld}">
        <div class="${styles.container}" ng-controller="HomeController as vm">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">{{vm.hello}}</span>
              </a>
            </div>
            <canvas id="bar" class="chart chart-bar"
            chart-data="vm.data" chart-labels="vm.labels" chart-series="vm.series"
          </canvas>
          </div>
        </div>
      </div>`;
      angular.module('todoapp', ["chart.js"])
      .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts 
        ChartJsProvider.setOptions({
          chartColors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
        })
      }])
      .controller('HomeController', function (): void {
        this.hello = "test";
        this.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.series = ['Series A', 'Series B'];
      
        this.data = [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ];
      });
    angular.bootstrap(this.domElement, ['todoapp']);
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
