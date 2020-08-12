import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { onMainContentChange } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onMainContentChange],
})
export class AppComponent implements OnInit {
  title = 'ficheros';
  theme = 'space-cadet-dark-theme';

  constructor(private overlayContainer: OverlayContainer) {}

  ngOnInit() {
    // subscribe to some source of theme change events, then...
    this.overlayContainer.getContainerElement().classList.add(this.theme);
    console.log(this.theme);
  }

  onThemeChange() {
    // this.overlayContainer.getContainerElement().classList.add(this.theme);
    // console.log(this.theme);
    // this.theme = theme;
    // console.log(this.theme);
    // const overlayContainerClasses = this.overlayContainer.getContainerElement()
    //   .classList;
    // const themeClassesToRemove = Array.from(
    //   overlayContainerClasses
    // ).filter((item: string) => item.includes('-theme'));
    //
    // if (themeClassesToRemove.length) {
    //   overlayContainerClasses.remove(...themeClassesToRemove);
    // }
    // overlayContainerClasses.add(this.theme);
  }
}
