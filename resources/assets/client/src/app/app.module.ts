// The core modules of the Angular Framework.
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

// The services to register on the application.
import { HttpClientService } from "./http-client.service";
import { ListItemService } from "./list-item.service";
import { OauthTokenService } from "./oauth-token.service";
import { UserService } from "./user.service";

// The components to show or view data on in the application.
import { AppComponent } from "./app.component";
import { AboutMeComponent } from "./about-me/about-me.component";
import { CardComponent } from "./card/card.component";
import { HomeComponent } from "./home/home.component";
import { ListCompletedComponent } from "./list-completed/list-completed.component";
import { ListOnProgressComponent } from "./list-on-progress/list-on-progress.component";
import { ListTodoComponent } from "./list-todo/list-todo.component";
import { LoginComponent } from "./login/login.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { PostareaComponent } from "./postarea/postarea.component";
import { RegisterComponent } from "./register/register.component";

// The routes available in the application to load data on.
const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about-me", component: AboutMeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    CardComponent,
    HomeComponent,
    ListCompletedComponent,
    ListOnProgressComponent,
    ListTodoComponent,
    LoginComponent,
    NavbarComponent,
    PostareaComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    HttpClientService,
    ListItemService,
    OauthTokenService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
