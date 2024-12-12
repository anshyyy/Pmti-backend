import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Student } from 'src/student/entities/student.entity';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/common/util/bcrypt.service';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { Role } from 'src/common/enums/role';
import { Admin } from 'src/admin/entities/admin.entity';
import { Country } from 'src/country/entities/country.entity';
import { CreateInstructorDto } from 'src/instructor/dto/create-instructor.dto';
import { Instructor } from 'src/instructor/entities/instructor.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Student)
        private studentsRepository: Repository<Student>,
        @InjectRepository(Instructor)
        private instructorRepository: Repository<Instructor>,
        @InjectRepository(Admin)
        private adminsRepository: Repository<Admin>,

        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
        private bcryptService: BcryptService,
    ) { }

    async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
        console.log(createStudentDto);
        const checkExistinguser = await this.usersRepository.findOne({ where: { email: createStudentDto.email } });
        if (checkExistinguser) {
            throw new Error("This Email Already Exists");
        }
        const user = new User();
        user.name = createStudentDto.name;
        user.email = createStudentDto.email;
        user.role = Role.STUDENT;
        user.password = await this.bcryptService.hashPassword(createStudentDto.password);

        const savedUser = await this.usersRepository.save(user);

        const student = new Student();
        Object.assign(student, createStudentDto); // Copy all properties from DTO to student
        student.uid = `STU-${Date.now()}`;
        student.user = savedUser;
        student.password = savedUser.password;

        return this.studentsRepository.save(student);
    }

    async createInstructor(createInstructorDto: CreateInstructorDto): Promise<Instructor> {
        const user = new User();
        user.name = createInstructorDto.name
        user.email = createInstructorDto.emailID;
        user.role = Role.INSTRUCTOR;
        user.password = await this.bcryptService.hashPassword(createInstructorDto.password);

        const savedUser = await this.usersRepository.save(user);

        const instructor = new Instructor();
        Object.assign(instructor, createInstructorDto);
        instructor.uid = `INS-${Date.now()}`;
        instructor.user = savedUser;

        return this.instructorRepository.save(instructor);
    }

    async createAdmin(createAdminDto: CreateAdminDto) {
        console.log(createAdminDto);
        const country = await this.countryRepository.findOne({ where: { id: createAdminDto.countryId } });
        if (!country) {
            throw new UnauthorizedException('Country not found');
        }

        const checkExistinguser = await this.usersRepository.findOne({ where: { email: createAdminDto.email } });
        if (checkExistinguser) {
            throw new Error("This Email Already Exists");
        }

        const user = new User();
        user.name = createAdminDto.name;

        user.email = createAdminDto.email;
        user.role = Role.ADMIN;
        user.password = await this.bcryptService.hashPassword(createAdminDto.password);

        const savedUser = await this.usersRepository.save(user);
        const admin = new Admin();
        admin.name = createAdminDto.name;
        admin.designation = createAdminDto.designation;
        admin.country = country;
        admin.email = createAdminDto.email,
            admin.phone = createAdminDto.phone,
            admin.password = savedUser.password,
            admin.isActive = true;
        admin.uid = `ADM-${Date.now()}`;
        admin.user = savedUser;
        return await this.adminsRepository.save(admin);
    }
}

