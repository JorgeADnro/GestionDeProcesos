import { Component } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig, PayPalScriptService } from 'ngx-paypal';
import { environment } from './../../../../environment/environment';
import { InactivityService } from 'src/app/services/inactivity-service.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent {
  loader = true;
  public payPalConfigs: { plan: string, config: IPayPalConfig }[] = [];
  public selectedPlan: string | null = null;

  constructor(
    private payPalScriptService: PayPalScriptService,
    private inactivityService: InactivityService
  ) {}

  ngOnInit(): void {
    this.initConfig();
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    this.inactivityService.startTimer();
  }

  private initConfig(): void {
    this.payPalConfigs = [
      {
        plan: 'Pro Lite',
        config: {
          currency: 'MXN',
          clientId: environment.clientID,
          createOrderOnClient: (data) => <ICreateOrderRequest>{
            intent: 'CAPTURE',
            purchase_units: [{
              amount: {
                currency_code: 'MXN',
                value: '10.00',
                breakdown: {
                  item_total: {
                    currency_code: 'MXN',
                    value: '10.00'
                  }
                }
              },
              items: [{
                name: 'Pro Lite',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'MXN',
                  value: '10.00',
                },
              }]
            }]
          },
          advanced: {
            commit: 'true'
          },
          style: {
            label: 'paypal',
            layout: 'vertical'
          },
          onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
          },
          onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          },
          onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
          },
          onError: err => {
            console.log('OnError', err);
          },
          onClick: (data, actions) => {
            console.log('onClick', data, actions);
            this.selectedPlan = 'Pro Lite';
          }
        }
      },
      {
        plan: 'Pro I',
        config: {
          currency: 'MXN',
          clientId: environment.clientID,
          createOrderOnClient: (data) => <ICreateOrderRequest>{
            intent: 'CAPTURE',
            purchase_units: [{
              amount: {
                currency_code: 'MXN',
                value: '20.00',
                breakdown: {
                  item_total: {
                    currency_code: 'MXN',
                    value: '20.00'
                  }
                }
              },
              items: [{
                name: 'Pro I',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'MXN',
                  value: '20.00',
                },
              }]
            }]
          },
          advanced: {
            commit: 'true'
          },
          style: {
            label: 'paypal',
            layout: 'vertical'
          },
          onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
          },
          onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          },
          onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
          },
          onError: err => {
            console.log('OnError', err);
          },
          onClick: (data, actions) => {
            console.log('onClick', data, actions);
            this.selectedPlan = 'Pro I';
          }
        }
      },
      {
        plan: 'Pro II',
        config: {
          currency: 'MXN',
          clientId: environment.clientID,
          createOrderOnClient: (data) => <ICreateOrderRequest>{
            intent: 'CAPTURE',
            purchase_units: [{
              amount: {
                currency_code: 'MXN',
                value: '30.00',
                breakdown: {
                  item_total: {
                    currency_code: 'MXN',
                    value: '30.00'
                  }
                }
              },
              items: [{
                name: 'Pro II',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'MXN',
                  value: '30.00',
                },
              }]
            }]
          },
          advanced: {
            commit: 'true'
          },
          style: {
            label: 'paypal',
            layout: 'vertical'
          },
          onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
          },
          onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          },
          onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
          },
          onError: err => {
            console.log('OnError', err);
          },
          onClick: (data, actions) => {
            console.log('onClick', data, actions);
            this.selectedPlan = 'Pro II';
          }
        }
      }
    ];
  }

  buy(plan: string): void {
    this.selectedPlan = plan;
  }
}
