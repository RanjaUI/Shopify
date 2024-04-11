import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Reactive form
import { ReactiveFormsModule } from '@angular/forms';

// Prime NG
import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';

// Custom modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './Component/product/product.component';
import { SearchFilterPipe } from './shared/search-filter.pipe';
import { AddProductComponent } from './Component/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SearchFilterPipe,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    DataViewModule,
    PaginatorModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    MessagesModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    KeyFilterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
