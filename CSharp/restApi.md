# Creating a Rest API with dotnet core 6

## Steps are as follow

### 1. First you need to create a class which will be the model of the data you want in the api  

### 2. Create a folder called data and a file inside of it called DataContext.cs

### 3. Make the class inside DataContext extend DbContext

### 4. Install EntityFrameworkCore EntityFrameworkCore.design EntityFramework.sqlserver nuget Packages

### 5. Add a connection string that will handle connecting to db to appsettings.json file add "ConnectionStrings"

{ "DefaultConnection": "Server=.;Database=[DBNAME];Trusted_Connection=;"}True

### 6. In the DataContext.cs file add the following

``` cs

    public DataContext(DbContextOptions<DataContext> options) : base(options) {}

     public DbSet<Fruit> Fruits { get; set; }

```

### 7. Go to program.cs and add the following

```cs

    global using FruitsApi.Data;
    global using Microsoft.EntityFrameworkCore; 

    builder.Services.AddDbContext<DataContext>(options =>{
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    });

```

### 8. in the nugetpackage console write the command 'dotnet ef migrations add CreateInitial'

### 9.  in the nugetpackage console write the command 'dotnet ef database update'

### 10. Create a controller for the model you created

### 11. add 2 attributes to the controller ( [Route("api/[controller]")]) and the [ApiController]

### 12. Go to the controller and add a constructor like the following code snippet

``` cs

        public FruitsController(DataContext context)
        {
            _context = context;
        }

```

### 13.Create an async method which will be the equivalent of http get method

#### In the following example the model is called Fruits

``` cs

        [HttpGet]
        public async Task<ActionResult<List<Fruit>>> Get()
        {
            return Ok(await _context.Fruits.ToListAsync());
        }

```

### 14. add the http post method to the controller

``` cs

       [HttpPost]
        public async Task<ActionResult<List<Fruit>>> addFruit(Fruit fruit)
        {
            _context.Fruits.Add(fruit);
            await _context.SaveChangesAsync();
            return Ok(await _context.Fruits.ToListAsync());
        }

```

### 15. add a get a specific item  

``` cs

        [HttpGet("{id}")]
        public async Task<ActionResult<Fruit>> Get(int id)
        {
            // search for the fruit with the id past as a parameter
            var dbFruit = await _context.Fruits.FindAsync(id);
            // if fruit is null send a 404 fruit not found
            if (dbFruit == null)
                return NotFound("Fruit not found");
            // if fruit is found send the fruit
            return Ok(dbFruit);
        }

```

### 16. update a specific item

``` cs

        [HttpPut("{id}")]
        public async Task<ActionResult<Fruit>> updateFruit(Fruit fruit,int id)
        {
            // search for the fruit with the id past as a parameter
            var dbFruit = await _context.Fruits.FindAsync(id);

            // if fruit is null send a 404 fruit not found
            if (dbFruit == null)
                return NotFound("Fruit not found");

            // update the fruit
            dbFruit.Name = fruit.Name;
            dbFruit.Rating = fruit.Rating;
            dbFruit.Review = fruit.Review;

            // Save changes to db
            await _context.SaveChangesAsync();

            // if fruit is found send the fruit
            return Ok(dbFruit);
        }

```

### 17. delete a specific fruits

``` cs

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Fruit>>> Delete(int id)
        {
            // Find the db to delete
            var dbFruitToDelete = await _context.Fruits.FindAsync(id);

            // if fruit is null send a 404 fruit not found
            if (dbFruitToDelete == null)
                return NotFound("Fruit not found");

            // if fruit is in the list remove it
            _context.Fruits.Remove(dbFruitToDelete);

            // save the changes to db
            await _context.SaveChangesAsync();

            // return the fruits list without the removed fruit
            return Ok(await _context.Fruits.ToListAsync());
        }

```
