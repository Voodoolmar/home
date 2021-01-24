using System;
using System.IO;
using SixLabors.ImageSharp;
using SixLabors.Primitives;

namespace SeoBiz.Cms.Images
{
	public class ImageService : IImageService
	{
		public void CropAndResize(string inputPath, string outputPath, int sourceX, int sourceY, int sourceWidth, int sourceHeight, int destinationWidth, int destinationHeight)
		{
			using (var image = Image.Load(inputPath))
			{
				image.Mutate(x => x
					.Crop(new Rectangle(sourceX, sourceY, sourceWidth, sourceHeight))
					.Resize(destinationWidth, destinationHeight));
				image.Save(outputPath);
			}
		}
	}
}