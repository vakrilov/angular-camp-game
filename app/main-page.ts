import 'reflect-metadata';
import {TextView} from 'ui/text-view';
import {topmost} from 'ui/frame';
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {Component} from 'angular2/core';

const operands = ["+", "-", "*", "/"];

interface Task {
    arg1: number;
    arg2: number;
    operand: string;
    answers: Array<number>;
    rightAnswerIndex: number;
}

@Component({
    selector: 'main',
    template: `
<StackLayout orientation='vertical'>
    <Button text="New Game"></Button>
    
    <GridLayout columns="*,*,*,*,*" rows="100">
        <Label class="task-label" [text]="task.arg1" col="0"></Label>
        <Label class="task-label" [text]="task.operand" col="1"></Label>
        <Label class="task-label" [text]="task.arg2" col="2"></Label>
        <Label class="task-label" text="=" col="3"></Label>
        <Label class="task-label" text="?" col="4"></Label>
    </GridLayout>
    
    <StackLayout>
        <Button *ngFor="#answer of task.answers; #i = index" 
            [text]="answer" class="answer"
            (tap)="onAnswer(i)"></Button>
    </StackLayout>

</StackLayout>
`,
})
export class MainPage {
    public task: Task;

    constructor() {
        this.nextTask();
    }

    private nextTask() {
        this.task = {
            arg1: this.getArg(),
            arg2: this.getArg(),
            operand: this.getOperation(),
            answers: [5, 10, 15, 20],
            rightAnswerIndex: 2
        }
    }

    private getArg(): number {
        return Math.floor((Math.random() * 10) + 1);
    }
    
    private getOperation(): string{
        var i = Math.floor((Math.random() * operands.length))
        return operands[i];
    }
    
    public onAnswer(index){
        console.log("answer index: " + index);
        this.nextTask();
    }

}