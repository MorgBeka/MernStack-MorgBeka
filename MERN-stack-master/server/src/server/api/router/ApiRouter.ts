import {
  default as express,
  Application,
  Request,
  Response,
  Router,
} from 'express';
import { IConfig, AuthService, Role } from '../../services';
import {
  BlogController,
  CategoryController,
  HelloController,
  MessageController,
  PostController,

  CatController,
  DogController,
  ShelterController,
  UserController,
  WalkController,

  BreedController,
  AdoptionController,
  EmployeeController,

} from '../controllers';

class ApiRouter {
  public router: Router;
  private blogController: BlogController;
  private categoryController: CategoryController;
  private helloController: HelloController;
  private messageController: MessageController;
  private postController: PostController;

  private dogController: DogController;
  private catController: CatController;
  private shelterController: ShelterController;
  private userController: UserController;
  private walkController: WalkController;

  private breedController: BreedController;
  private adoptionController: AdoptionController;
  private employeeController: EmployeeController;

  private config: IConfig;
  private authService: AuthService;

  constructor(config: IConfig, authService: AuthService) {
    this.config = config;
    this.authService = authService;

    this.router = express.Router();

    this.registerControllers();
    this.registerRoutes();
  }

  private registerControllers(): void {
    this.blogController = new BlogController();
    this.categoryController = new CategoryController();
    this.helloController = new HelloController();
    this.messageController = new MessageController();
    this.postController = new PostController();

    this.dogController = new DogController();
    this.catController = new CatController();
    this.shelterController = new ShelterController();
    this.userController = new UserController(this.config, this.authService);
    this.walkController = new WalkController();

    this.breedController = new BreedController();
    this.adoptionController = new AdoptionController();
    this.employeeController = new EmployeeController();
  }

  private registerRoutes(): void {
    /*
     * Hello routes
     */
    this.router.get('/hello', this.helloController.index);
    /*
     * Message routes
     */
    this.router.get('/messages', this.messageController.index);
    this.router.get('/messages/:id', this.messageController.show);
    /*
     * Blog routes
     */
    this.router.get('/blogs', this.blogController.index);
    this.router.get('/blogs/:id', this.blogController.show);
    /*
     * Category routes
     */
    this.router.get('/categories', this.categoryController.index);
    /*
     * Post routes
     */
    this.router.get('/posts', this.postController.index);
    this.router.get('/posts/create', this.postController.create); // Must be before the route /posts/:id
    this.router.get('/posts/:id', this.postController.show);
    this.router.post('/posts', this.postController.store);
    this.router.get('/posts/:id/edit', this.postController.edit);
    this.router.put('/posts/:id', this.postController.update);
    this.router.delete('/posts/:id', this.postController.destroy);


   /*
     * Dog routes
     */
    this.router.get('/dogs', this.dogController.index);
    this.router.get('/dogs/create', this.dogController.create); // Must be before the route /posts/:id
    this.router.get('/dog_detail/:id', this.dogController.show);
    this.router.post('/dogs', this.dogController.store);
    this.router.get('/dogs/:id/edit', this.dogController.edit);
    this.router.put('/dogs/:id', this.dogController.update);
    this.router.delete('/dogs/:id', this.dogController.destroy);    
    
    /*
    * Cat routes
     */
    this.router.get('/cats', this.catController.index);
    this.router.get('/cats/create', this.catController.create); // Must be before the route /posts/:id
    this.router.get('/cat_detail/:id', this.catController.show);
    this.router.post('/cats', this.catController.store);
    this.router.get('/cats/:id/edit', this.catController.edit);
    this.router.put('/cats/:id', this.catController.update);
    this.router.delete('/cats/:id', this.catController.destroy);

    /*
     * Shelter routes
     */
    this.router.get('/shelters', this.shelterController.index);
    this.router.get('/shelters/create', this.shelterController.create);
    this.router.get('/shelter_detail/:id', this.shelterController.show);
    this.router.post('/shelters', this.shelterController.store);
    this.router.get('/shelters/:id/edit', this.shelterController.edit);
    this.router.put('/shelters/:id', this.shelterController.update);
    this.router.delete('/shelters/:id', this.shelterController.destroy);
    
    /*
     * Walk routes
     */
    this.router.get('/walks', this.walkController.index);
    this.router.get('/walks/create', this.walkController.create); // Must be before the route /posts/:id
    this.router.get('/walk_detail/:id', this.walkController.show);
    this.router.post('/walks', this.walkController.store);
    this.router.get('/walks/:id/edit', this.walkController.edit);
    this.router.put('/walks/:id', this.walkController.update);
    this.router.delete('/walks/:id', this.walkController.destroy);    
    
    /*
     * Users routes
     */
    this.router.get('/users', this.userController.index);
    this.router.get('/users/:id', this.userController.show);
    this.router.delete('/users/:id', this.userController.destroy);
    this.router.post('/auth/signin/', this.userController.signInLocal);
    this.router.post('/auth/signup/', this.userController.signupLocal);


    /*
     * Breed routes
     */
    this.router.get('/breeds', this.breedController.index);
    this.router.get('/breeds/create', this.breedController.create); // Must be before the route /posts/:id
    this.router.get('/breeds/:id', this.breedController.show);
    this.router.post('/breeds', this.breedController.store);
    this.router.get('/breeds/:id/edit', this.breedController.edit);
    this.router.put('/breeds/:id', this.breedController.update);
    this.router.delete('/breeds/:id', this.breedController.destroy);



    /*
     * Adoption routes
     */
    this.router.get('/adoptions', this.adoptionController.index);
    this.router.get('/adoptions/create', this.adoptionController.create); // Must be before the route /posts/:id
    this.router.get('/adoptions/:id', this.adoptionController.show);
    this.router.post('/adoptions', this.adoptionController.store);
    this.router.get('/adoptions/:id/edit', this.adoptionController.edit);
    this.router.put('/adoptions/:id', this.adoptionController.update);
    this.router.delete('/adoptions/:id', this.adoptionController.destroy);



    /*
     * Employee routes
     */
    this.router.get('/employees', this.employeeController.index);
    this.router.get('/employees/create', this.employeeController.create); // Must be before the route /posts/:id
    this.router.get('/employees/:id', this.employeeController.show);
    this.router.post('/employees', this.employeeController.store);
    this.router.get('/employees/:id/edit', this.employeeController.edit);
    this.router.put('/employees/:id', this.employeeController.update);
    this.router.delete('/employees/:id', this.employeeController.destroy);


  }
}

export default ApiRouter;
