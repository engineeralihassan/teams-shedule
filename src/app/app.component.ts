import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teams-shedule';
  teamsArray:string[]=[];
  nextRoundTeams:string[]=[];
  nextRound:boolean=false;
  uniqueArray:number[]=[];
  uniqueArray1:number[]=[];
  teamslength!:number;
  
  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      inputValue: new FormControl('', [Validators.required, Validators.min(1), this.evenNumberValidator])
    });
  }

  evenNumberValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (value % 2 !== 0) {
      return { 'notEven': true };
    }
    return null;
  }

  onSubmit() {
    // Handle form submission
    
    if(this.myForm.value.inputValue%2==0 && this.myForm.value.inputValue
       && this.myForm.value.inputValue>0 ){
      this.fillArray(this.myForm.value.inputValue);
      this.teamslength=this.myForm.value.inputValue;
    } 

    else{
      alert("please inter positive Even Value");
    }
  



  }

fillArray(teams:number){
  this.ShuffleTeams(teams);
}
ShuffleTeams(value:number){
while (this.uniqueArray.length < value) {
const randomNumber = Math.floor(Math.random() * value) + 1;
  
    if (!this.uniqueArray.includes(randomNumber)) {
      this.uniqueArray.push(randomNumber);
    }
  }

  console.log("The first Array",this.uniqueArray);
  if(this.myForm.value.inputValue==2){
    const team1 = `Team ${this.uniqueArray[0]}`;

    const team2 = `Team ${this.uniqueArray[1] || 'BYE'}`; // Handle odd number of teams
  
    const matchup = `${team1} vs ${team2}`;
    
    this.teamsArray.push(matchup);
  }
  else{
  for (let i = 0; i < this.uniqueArray.length; i += 2) {
    
    const team1 = `Team ${this.uniqueArray[i]}`;

    const team2 = `Team ${this.uniqueArray[i + 1] || 'BYE'}`; // Handle odd number of teams
  
    const matchup = `${team1} vs ${team2}`;
    
    this.teamsArray.push(matchup);
  }

  }

  }

  NextRoundTeams(){
    if(this.myForm.value.inputValue%2==0 && this.myForm.value.inputValue && this.myForm.value.inputValue>0  ){
      if(this.myForm.value.inputValue==2){
        alert("We can not move to Next round becuase there is only 2 teams ")
      }
      else{
  
      
      this.nextRound=true;
  
      while (this.uniqueArray.length < this.teamslength) {
      const randomNumber = Math.floor(Math.random() * this.teamslength) + 1;
        
          if (!this.uniqueArray.includes(randomNumber)) {
            this.uniqueArray1.push(randomNumber);
          }
        }
        console.log("The first Array",this.uniqueArray);
        let index=0;
        
        for (let i=this.uniqueArray.length-1 ; i >=0; i-=2) {
          
            const team1 = `Team ${this.uniqueArray[i]}`;
            const team2 = `Team ${this.uniqueArray[index] }`; // Handle odd number of teams
          
            const matchup = `${team1} vs ${team2}`;
            this.nextRoundTeams.push(matchup);
            index=index+2;
  
  
          
         
        }
  
        console.log("Next Round Teams",this.nextRoundTeams);
      
      
      
        }
    }
    else{
      alert("please inter positive Even Value");
    }
  
    }
}
