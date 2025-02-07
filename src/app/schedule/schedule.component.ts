import { Component, HostListener } from '@angular/core';
import Lecture from '../shared/classes/lecture';
import TypeEnum from '../shared/enums/type-enum';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { LecturesData } from '../shared/data/LecturesData';
import Speaker from '../shared/classes/speaker';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  dayActive: number = 0;

  daysList = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  lectureListByDays: Lecture[][] = LecturesData;

  innerWidth: number = 480;

  showSchedule: boolean = true;

  getIcon(type: number): IconDefinition {
    return TypeEnum.getIcon(type);
  }

  getColor(type: number): string {
    return TypeEnum.getColor(type);
  }

  getType(type: number): string {
    return TypeEnum.getType(type);
  }

  calculateEndTime(lecture: Lecture): Date {
    // Calcula o horário de término da palestra pegando o horário de início e somando a duração em minutos
    let endTime = new Date(
      lecture.dateTime.getTime() + lecture.duration * 60000
    );
    return endTime;
  }

  changeDay(day: number): void {
    this.dayActive = day;
  }

  getSpeakerName(speaker: Speaker | Speaker[]): string {
    if (Array.isArray(speaker)) {
      let speakerName = '';
      speaker.forEach((speaker) => {
        speakerName += `${speaker.fullName}, `;
      });
      return speakerName.slice(0, -2);
    } else {
      return speaker.fullName;
    }
  }

  replaceMarkdownUrlWithAnchorTag(input: string): string {
    const urlRegex = /(\[([^\]]+)])\(([^)]+)\)/g;

    const replacedString = input.replace(
      urlRegex,
      '<a href="$3" target="_blank"> $2 </a>'
    );

    return replacedString;
  }

  replaceURLsWithAnchorTags(input: string): string {
    if (input.includes('(')) {
      return this.replaceMarkdownUrlWithAnchorTag(input);
    }
    // Expressão regular para encontrar URLs que começam com "https://" ou "http://"
    const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g;

    // Substitui as URLs encontradas por uma tag <a> com o link
    const replacedString = input.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank">Youtube</a>`;
    });

    return replacedString;
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.innerWidth = window.innerWidth;
  }
}
