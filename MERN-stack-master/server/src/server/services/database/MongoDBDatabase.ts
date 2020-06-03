import { default as mongoose, Connection } from 'mongoose';
import { default as faker } from 'faker';

import { ILogger } from '../logger';
import { IConfig } from '../config';
import {
  IBlog,
  Blog,
  IMessage,
  Message,
  IUser,
  User,
  Post,
  IPost,

  IDog,
  Dog,
  ICat,
  Cat,
  Shelter,
  IShelter,
  Walk,
  IWalk,

  Breed,
  IBreed,
  Adoption,
  IAdoption,
  Employee,
  IEmployee,

  ICategory,
  Category,
} from '../../models/mongoose';

class MongoDBDatabase {
  private config: IConfig;
  private logger: ILogger;
  private db: Connection;

  private blogs: Array<IBlog>;
  private categories: Array<ICategory>;
  private posts: Array<IPost>;
  
  private cats: Array<ICat>;
  private dogs: Array<IDog>;
  private walks: Array<IWalk>;
  private shelters: Array<IShelter>;
  private users: Array<IUser>;

  private breeds: Array<IBreed>;
  private adoptions: Array<IAdoption>;
  private employees: Array<IEmployee>;
  

  constructor(logger: ILogger, config: IConfig) {
    this.logger = logger;
    this.config = config;

    this.blogs = [];
    this.categories = [];
    this.posts = [];

    this.cats = [];
    this.dogs = [];
    this.walks = [];
    this.shelters = [];
    this.users = [];

    this.breeds = [];
    this.employees = [];
    this.adoptions = [];
  }

  public connect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      mongoose
        .connect(this.config.mongoDBConnection, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(data => {
          this.db = mongoose.connection;

          this.logger.info('Connected to the mongodb database', {});

          resolve(true);
        })
        .catch(error => {
          this.logger.error("Can't connect to the database", error);

          reject(error);
        });
    });
  }

  public disconnect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db
        .close(true)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          this.logger.error("Can't disconnect the database", error);

          reject(error);
        });
    });
  }

  private messageCreate = async (body: string) => {
    const message = new Message({ body });

    try {
      const newMessage = await message.save();

      this.logger.info(`Message created with id ${newMessage._id}`, {});
    } catch (error) {
      this.logger.error('An error occurred when creating a message', error);
    }
  };

  private createMessages = async () => {
    const promises = [];
    for (let i = 0; i < 100; i++) {
      promises.push(this.messageCreate(faker.lorem.paragraph()));
    }
  };

  private userCreate = async (
    email: string,
    password: string,
    role: string,
    firstName: string,
    lastName: string,
    avatar: string,
  ) => {
    const userDetail = {
      email,
      localProvider: {
        password,
      },
      role,
      profile: {
        firstName,
        lastName,
        avatar,
      },
    };

    const user: IUser = new User(userDetail);

    try {
      const createdUser = await user.save();
      this.users.push(createdUser);

      this.logger.info(`User created with id: ${createdUser._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a user ${err}`, err);
    }
  };

  private createUsers = async () => {
    const promises = [];

    this.userCreate(
      'drdynscript@gmail.com',
      'nmdgent007!',
      'administrator',
      'Philippe',
      'De Pauw - Waterschoot',
      'https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/42580828_10214673932035654_3017264055002857472_n.jpg?_nc_cat=104&_nc_sid=85a577&_nc_oc=AQkUCFAyscOEkhhfuiS4Fq4sY8_1_l56xU0xQurtXuVXLu3ipVfwpCB0eSPIcRhoFLI&_nc_ht=scontent-bru2-1.xx&oh=b032a18ceb8fc6e7e678f676cf356a4e&oe=5EA14E2B',
    );

    for (let i = 0; i < 30; i++) {
      const gender = Math.round(Math.random());
      promises.push(
        this.userCreate(
          faker.internet.email(),
          'nmdgent007!',
          'user',
          faker.name.firstName(gender),
          faker.name.lastName(gender),
          faker.internet.avatar(),
        ),
      );
    }

    return await Promise.all(promises);
  };

  private getRandomCategory = () => {
    let category: ICategory = null;
    if (this.categories && this.categories.length > 0) {
      category = this.categories[
        Math.floor(Math.random() * this.categories.length)
      ];
    }
    return category;
  };

  private postCreate = async (
    title: string,
    synopsis: string,
    body: string,
    imageUrl: string,
  ) => {
    const postDetail = {
      title,
      synopsis,
      body,
      imageUrl,
      _categoryId: this.getRandomCategory()._id,
    };

    const post: IPost = new Post(postDetail);

    try {
      const createdPost = await post.save();
      this.posts.push(createdPost);

      this.logger.info(`Post created with id: ${createdPost._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a post ${err}`, err);
    }
  };

  private createPosts = async () => {
    const promises = [];

    for (let i = 0; i < 28; i++) {
      promises.push(
        this.postCreate(
          faker.lorem.sentence(),
          faker.lorem.paragraph(),
          `<p>${faker.lorem.paragraphs(10, '</p><p>')}</p>`,
          `https://picsum.photos/seed/${i}/800/450`,
        ),
      );
    }

    return await Promise.all(promises);
  };

  private shelterCreate = async (
    title: string,
    synopsis: string,
    body: string,
    imageUrl: string,
  ) => {
    const shelterDetail = {
      title,
      synopsis,
      body,
      imageUrl,
      _categoryId: this.getRandomCategory()._id,
    };

    const shelter: IShelter = new Shelter(shelterDetail);

    try {
      const createdShelter = await shelter.save();
      this.shelters.push(createdShelter);

      this.logger.info(`Shelter created with id: ${createdShelter._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a shelter ${err}`, err);
    }
  };

  private createShelters = async () => {
    const promises = [];

    for (let i = 0; i < 28; i++) {
      promises.push(
        this.shelterCreate(
          faker.lorem.sentence(),
          faker.lorem.paragraph(),
          `<p>${faker.lorem.paragraphs(10, '</p><p>')}</p>`,
          `https://picsum.photos/seed/${i}/800/450`,
        ),
      );
    }

    return await Promise.all(promises);
  };

  private walkCreate = async (
    title: string,
    synopsis: string,
    body: string,
    imageUrl: string,
  ) => {
    const walkDetail = {
      title,
      synopsis,
      body,
      imageUrl,
      _categoryId: this.getRandomCategory()._id,
    };

    const walk: IWalk = new Walk(walkDetail);

    try {
      const createdWalk = await walk.save();
      this.walks.push(createdWalk);

      this.logger.info(`Walk created with id: ${createdWalk._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a walk ${err}`, err);
    }
  };

  private createWalks = async () => {
    const promises = [];

    for (let i = 0; i < 28; i++) {
      promises.push(
        this.walkCreate(
          faker.lorem.sentence(),
          faker.lorem.paragraph(),
          `<p>${faker.lorem.paragraphs(10, '</p><p>')}</p>`,
          `https://picsum.photos/seed/${i}/800/450`,
        ),
      );
    }

    return await Promise.all(promises);
  };





  private dogCreate = async (
    title: string,
    synopsis: string,
    body: string,
    imageUrl: string,
  ) => {
    const dogDetail = {
      title,
      synopsis,
      body,
      imageUrl,
      _categoryId: this.getRandomCategory()._id,
    };

    const dog: IDog = new Dog(dogDetail);

    try {
      const createdDog = await dog.save();
      this.dogs.push(createdDog);

      this.logger.info(`Dog created with id: ${createdDog._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a dog ${err}`, err);
    }
  };

  private createDogs = async () => {
    const promises = [];

    for (let i = 0; i < 28; i++) {
      promises.push(
        this.dogCreate(
          faker.lorem.sentence(),
          faker.lorem.paragraph(),
          `<p>${faker.lorem.paragraphs(10, '</p><p>')}</p>`,
          `https://picsum.photos/seed/${i}/800/450`,
        ),
      );
    }

    return await Promise.all(promises);
  };


  private catCreate = async (
    title: string,
    synopsis: string,
    body: string,
    imageUrl: string,
  ) => {
    const catDetail = {
      title,
      synopsis,
      body,
      imageUrl,
      _categoryId: this.getRandomCategory()._id,
    };

    const cat: ICat = new Cat(catDetail);

    try {
      const createdCat = await cat.save();
      this.cats.push(createdCat);

      this.logger.info(`Cat created with id: ${createdCat._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a cat ${err}`, err);
    }
  };

  private createCats = async () => {
    const promises = [];

    for (let i = 0; i < 28; i++) {
      promises.push(
        this.catCreate(
          faker.lorem.sentence(),
          faker.lorem.paragraph(),
          `<p>${faker.lorem.paragraphs(10, '</p><p>')}</p>`,
          `https://picsum.photos/seed/${i}/800/450`,
        ),
      );
    }

    return await Promise.all(promises);
  };


  private breedCreate = async (
    title: string,
    synopsis: string,
    body: string,
    imageUrl: string,
  ) => {
    const breedDetail = {
      title,
      synopsis,
      body,
      imageUrl,
      _categoryId: this.getRandomCategory()._id,
    };

    const breed: IBreed = new Breed(breedDetail);

    try {
      const createdBreed = await breed.save();
      this.breeds.push(createdBreed);

      this.logger.info(`Breed created with id: ${createdBreed._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a breed ${err}`, err);
    }
  };

  private createBreeds = async () => {
    const promises = [];

    for (let i = 0; i < 28; i++) {
      promises.push(
        this.breedCreate(
          faker.lorem.sentence(),
          faker.lorem.paragraph(),
          `<p>${faker.lorem.paragraphs(10, '</p><p>')}</p>`,
          `https://picsum.photos/seed/${i}/800/450`,
        ),
      );
    }

    return await Promise.all(promises);
  };




  private employeeCreate = async (
    title: string,
    synopsis: string,
    body: string,
    imageUrl: string,
  ) => {
    const employeeDetail = {
      title,
      synopsis,
      body,
      imageUrl,
      _categoryId: this.getRandomCategory()._id,
    };

    const employee: IEmployee = new Employee(employeeDetail);

    try {
      const createdEmployee = await employee.save();
      this.employees.push(createdEmployee);

      this.logger.info(`Employee created with id: ${createdEmployee._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a employee ${err}`, err);
    }
  };

  private createEmployees = async () => {
    const promises = [];

    for (let i = 0; i < 28; i++) {
      promises.push(
        this.employeeCreate(
          faker.lorem.sentence(),
          faker.lorem.paragraph(),
          `<p>${faker.lorem.paragraphs(10, '</p><p>')}</p>`,
          `https://picsum.photos/seed/${i}/800/450`,
        ),
      );
    }

    return await Promise.all(promises);
  };





  private adoptionCreate = async (
    title: string,
    synopsis: string,
    body: string,
    imageUrl: string,
  ) => {
    const adoptionDetail = {
      title,
      synopsis,
      body,
      imageUrl,
      _categoryId: this.getRandomCategory()._id,
    };

    const adoption: IAdoption = new Adoption(adoptionDetail);

    try {
      const createdAdoption = await adoption.save();
      this.adoptions.push(createdAdoption);

      this.logger.info(`Post created with id: ${createdAdoption._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a adoption ${err}`, err);
    }
  };

  private createAdoptions = async () => {
    const promises = [];

    for (let i = 0; i < 28; i++) {
      promises.push(
        this.adoptionCreate(
          faker.lorem.sentence(),
          faker.lorem.paragraph(),
          `<p>${faker.lorem.paragraphs(10, '</p><p>')}</p>`,
          `https://picsum.photos/seed/${i}/800/450`,
        ),
      );
    }

    return await Promise.all(promises);
  };


  private categoryCreate = async (name: string, description: string) => {
    const categoryDetail = {
      name,
      description,
    };

    const category: ICategory = new Category(categoryDetail);

    try {
      const createdCategory = await category.save();
      this.categories.push(createdCategory);

      this.logger.info(`Category created with id: ${createdCategory._id}`, {});
    } catch (err) {
      this.logger.error(
        `An error occurred when creating a category ${err}`,
        err,
      );
    }
  };

  private createCategories = async () => {
    const promises = [];

    for (let i = 0; i < 8; i++) {
      promises.push(
        this.categoryCreate(faker.lorem.word(), faker.lorem.paragraph()),
      );
    }

    return await Promise.all(promises);
  };

  private getRandomPostsAsArrayOfIds(nPosts: number) {
    const tempPosts = JSON.parse(JSON.stringify(this.posts)) as Array<IPost>;
    const arrayOfIds = [];
    while (arrayOfIds.length < nPosts) {
      const removedPost = tempPosts.splice(
        Math.floor(Math.random() * nPosts),
        1,
      )[0];
      arrayOfIds.push(removedPost._id);
    }
    return arrayOfIds;
  }

  private blogCreate = async (title: string, synopsis: string) => {
    const blogDetail = {
      title,
      synopsis,
      _postIds: this.getRandomPostsAsArrayOfIds(
        Math.floor(Math.random() * this.posts.length),
      ),
    };

    const blog: IBlog = new Blog(blogDetail);

    try {
      const createdBlog = await blog.save();
      this.blogs.push(createdBlog);

      this.logger.info(`Blog created with id: ${createdBlog._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a blog ${err}`, err);
    }
  };

  private createBlogs = async () => {
    const promises = [];

    for (let i = 0; i < 1; i++) {
      promises.push(
        this.blogCreate(faker.lorem.word(), faker.lorem.paragraph()),
      );
    }

    return await Promise.all(promises);
  };

  public seed = async () => {
    const messages = await Message.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createMessages();
        }
        return Message.find().exec();
      });

    this.users = await User.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createUsers();
        }
        return User.find().exec();
      });

    this.categories = await Category.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createCategories();
        }
        return Category.find().exec();
      });

    this.posts = await Post.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createPosts();
        }
        return Post.find().exec();
      });

    this.blogs = await Blog.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createBlogs();
        }
        return Blog.find().exec();
      });


    this.shelters = await Shelter.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createShelters();
        }
        return Shelter.find().exec();
      });

    this.walks = await Walk.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createWalks();
        }
        return Walk.find().exec();
      });


    this.dogs = await Dog.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createDogs();
        }
        return Dog.find().exec();
      });


    this.cats = await Cat.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createCats();
        }
        return Cat.find().exec();
      });


      this.breeds = await Breed.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createBreeds();
        }
        return Breed.find().exec();
      });

      this.employees = await Employee.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createEmployees();
        }
        return Employee.find().exec();
      });

      this.adoptions = await Adoption.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createAdoptions();
        }
        return Adoption.find().exec();
      });

  };
}

export default MongoDBDatabase;
