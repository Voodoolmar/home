using System;
using System.IO;
using System.Threading.Tasks;
using ImageMagick;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SeoBiz.Cms.Images;

namespace ProMamaClub
{
	public class UploadModel
	{
		public string CropData { get; set; }
		public IFormFile File { get; set; }
	}

	public class UploadImagesModel
	{
		public string FileName { get; set; }
		public IFormFile Large { get; set; }
		public IFormFile Middle { get; set; }
		public IFormFile Small { get; set; }
	}

	public class CropData
	{
		public CropItem Large { get; set; }
		public CropItem Middle { get; set; }
		public CropItem Small { get; set; }
	}

	public class CropItem
	{
		public double Height { get; set; }
		public double Width { get; set; }
		public double X { get; set; }
		public double Y { get; set; }
	}

	public class UploadController : Controller
	{
		private readonly IHostingEnvironment _env;
		private readonly IImageService _imageService;
		private readonly IAuthService _authService;

		public UploadController(IHostingEnvironment env, IImageService imageService, IAuthService authService)
		{
			_env = env;
			_imageService = imageService;
			_authService = authService;
		}

		[RequestSizeLimit(5_000_000)]
		[IgnoreAntiforgeryToken(Order = 1001)]
		public async Task<ActionResult> PostImages(UploadImagesModel model)
		{
			if (!await _authService.IsAuthentificated()) return NotFound();
			

			var largeImages = Path.Combine(_env.WebRootPath, "images", "large");
			var middleImages = Path.Combine(_env.WebRootPath, "images", "middle");
			var smallImages = Path.Combine(_env.WebRootPath, "images", "small");
			if (!Directory.Exists(largeImages)) Directory.CreateDirectory(largeImages);
			if (!Directory.Exists(middleImages)) Directory.CreateDirectory(middleImages);
			if (!Directory.Exists(smallImages)) Directory.CreateDirectory(smallImages);

			var fileName = Helpers.Translit(model.FileName);

			await SaveFile(model.Large, largeImages, fileName);
			await SaveFile(model.Middle, middleImages, fileName);
			await SaveFile(model.Small, smallImages, fileName);

			return Json(new
			{
				filename = fileName
			});
		}

		[RequestSizeLimit(5_000_000)]
		[IgnoreAntiforgeryToken(Order = 1001)]
		public async Task<ActionResult> PostImage(UploadModel model)
		{
			if (!await _authService.IsAuthentificated()) return NotFound();

			var cropData = JsonConvert.DeserializeObject<CropData>(model.CropData);

			var largeImages = Path.Combine(_env.WebRootPath, "images", "large");
			var middleImages = Path.Combine(_env.WebRootPath, "images", "middle");
			var smallImages = Path.Combine(_env.WebRootPath, "images", "small");
			if (!Directory.Exists(largeImages)) Directory.CreateDirectory(largeImages);
			if (!Directory.Exists(middleImages)) Directory.CreateDirectory(middleImages);
			if (!Directory.Exists(smallImages)) Directory.CreateDirectory(smallImages);

			var fileName = Helpers.Translit(model.File.FileName);

			var filePath = Path.Combine(_env.WebRootPath, "images", fileName);
			if (!System.IO.File.Exists(filePath))
			{
				using (var fileStream = new FileStream(filePath, FileMode.Create))
				{
					await model.File.CopyToAsync(fileStream);
				}
			}

			try
			{
				_imageService.CropAndResize(filePath, Path.Combine(largeImages, fileName), (int) cropData.Large.X,
					(int) cropData.Large.Y, (int) cropData.Large.Width, (int) cropData.Large.Height, 1100, 630);
				_imageService.CropAndResize(filePath, Path.Combine(middleImages, fileName), (int) cropData.Middle.X,
					(int) cropData.Middle.Y, (int) cropData.Middle.Width, (int) cropData.Middle.Height, 400, 350);
				_imageService.CropAndResize(filePath, Path.Combine(smallImages, fileName), (int) cropData.Small.X,
					(int) cropData.Small.Y, (int) cropData.Small.Width, (int) cropData.Small.Height, 60, 60);
			}
			catch(Exception ex)
			{
				Console.WriteLine(ex.Message);
				Console.WriteLine(ex.StackTrace);
			}

			return Json(new
			{
				filename = fileName
			});
		}

		[IgnoreAntiforgeryToken(Order = 1001)]
		public async Task<ActionResult> Index(UploadModel model)
		{
			if (!await _authService.IsAuthentificated()) return NotFound();

			var fileName = Helpers.Translit(model.File.FileName);
			var folderPath = Path.Combine(_env.WebRootPath, "images");

			await SaveFile(model.File, folderPath, fileName);
			
			return Json(new
			{
				link = "/images/" + fileName
			});
		}

		private static async Task SaveFile(IFormFile file, string folderPath, string fileName)
		{
			var filePath = Path.Combine(folderPath, fileName ?? file.FileName);
			if (System.IO.File.Exists(filePath))
			{
				System.IO.File.Delete(filePath);
			}
			using (var image = new MagickImage(file.OpenReadStream()))
			{
				image.Format = MagickFormat.Pjpeg;
				image.Quality = 90;
				using (var fs = new FileStream(filePath, FileMode.Create))
				{
					image.Write(fs);
				}
			}
		}
	}
}