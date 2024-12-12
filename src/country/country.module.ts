import { forwardRef, Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { LocationModule } from 'src/location/location.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country]),
    forwardRef(() => LocationModule)
  ],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [CountryService]
})
export class CountryModule {}