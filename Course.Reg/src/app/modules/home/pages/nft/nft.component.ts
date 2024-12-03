import { Component, OnInit } from '@angular/core';
import { Nft } from '../../models/nft';
import { NftAuctionsTableComponent } from '../../components/nft/nft-auctions-table/nft-auctions-table.component';
import { NftChartCardComponent } from '../../components/nft/nft-chart-card/nft-chart-card.component';
import { NftSingleCardComponent } from '../../components/nft/nft-single-card/nft-single-card.component';
import { NftDualCardComponent } from '../../components/nft/nft-dual-card/nft-dual-card.component';
import { NftHeaderComponent } from '../../components/nft/nft-header/nft-header.component';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  standalone: true,
  imports: [
    NftHeaderComponent,
    NftDualCardComponent,
    NftSingleCardComponent,
    NftChartCardComponent,
    NftAuctionsTableComponent,
  ],
})
export class NftComponent implements OnInit {
  nft: Array<Nft>;
  nft2: Array<Nft>;
  private apiUrl = 'http://localhost:3000/api/course/all';
  private bearerToken : string;


  constructor(private authService: AuthService) {
    this.bearerToken = this.authService.jwt || '';
    console.log(this.bearerToken,"  this is working");

    this.nft = [
      {
        id: 34356771,
        title: 'Girls of the Cartoon Universe',
        instant_price: 4.2,
        price: 187.47,
        last_bid: 0.12,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356772,
        title: 'Pupaks',
        price: 548.79,
        last_bid: 0.35,
        image: './assets/images/img-02.jpg',
      },
      {
        id: 34356773,
        title: 'Seeing Green collection',
        price: 234.88,
        last_bid: 0.15,
        image: './assets/images/img-03.jpg',
      },
    ];

    this.nft2 = [
      {
        id: 34356771,
        title: 'Girls of the Cartoon Universe',
        instant_price: 4.2,
        price: 187.47,
        last_bid: 0.12,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356772,
        title: 'Pupaks',
        price: 548.79,
        last_bid: 0.35,
        image: './assets/images/img-02.jpg',
      },
      {
        id: 34356773,
        title: 'Seeing Green collection',
        price: 234.88,
        last_bid: 0.15,
        image: './assets/images/img-03.jpg',
      },
    ];
  }

  ngOnInit(): void {
    this.fetchNftData();
  }

  async fetchNftData() {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.bearerToken}`, // Add Bearer token to headers
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json(); // Parse the JSON response
      console.log('Fetched course data:', responseData);

      this.nft = responseData.data.map((course: any) => ({
        id: course.id,
        title: course.title || course.courseName, // Use title or courseName as fallback
        price: course.courseCredit, // Map courseCredit to price
        last_bid: course.duration, // Map duration to last_bid
        courseImg: course.courseImg, // Map courseImg to image
        description: course.description, // Optional: Include description if needed
      }));

      console.log('Mapped NFT data:', this.nft);

      // const data = await response.json(); // Parse the JSON response
      // console.log('Fetched NFT data:', data);// Update the nft array with fetched data
    } catch (error) {
      console.error('Error fetching NFT data:', error);
    }
  }


  // ngOnInit(): void {}
}
