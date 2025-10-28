import { useEffect, useState } from 'react';
import { Image } from '../ui/Image';
import { ImageMask } from '../ui/ImageMask';
import { Trash } from '../ui/Trash';
import type { SectionFormProps } from './types';

export const SectionForm: React.FC<SectionFormProps> = ({
  formType,
  section,
  index,
  setSection,
  dropSection,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSection({ ...section, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSection({ ...section, [name]: value });
  };

  useEffect(() => {
    if (!section.image) {
      setPreview(null);
      return;
    }

    if (section.image instanceof File) {
      const objectUrl = URL.createObjectURL(section.image);
      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    setPreview(section.image);
  }, [section.image]);

  const removeImage = () => setSection({ ...section, image: null });
  const isReverse = index % 2 !== 0 ? 'flex-row-reverse' : '';

  return (
    <div id={formType}>
      <section className={`relative ${index === 0 ? 'hero-section' : `info-section ${isReverse}`}`}>
        {/* Image */}
        {preview ? (
          <div className="relative group">
            {/* Image Preview */}
            {formType === 'products' && index === 0 ? (
              <ImageMask src={preview} alt="Image Preview" mask="rock-mask.svg" />
            ) : (
              <Image src={preview} alt="Image Preview" className="w-full rounded-xl" />
            )}

            {/* Remove Preview Button  */}
            <Trash onClick={removeImage} className="absolute top-0 right-0 m-2 hover-vis" />
          </div>
        ) : (
          <label htmlFor={`image-upload-${index}`} className="file-input cursor-pointer">
            +
          </label>
        )}
        <input
          id={`image-upload-${index}`}
          onChange={handleFileChange}
          type="file"
          name="image"
          className="hidden"
        />

        {/* Text */}
        <div className="text-container">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={section.title}
            onChange={handleTextChange}
            required
          />
          {formType === 'products' && (
            <input
              type="text"
              name="subheading"
              placeholder="Subheading (optional)"
              value={section.subheading}
              onChange={handleTextChange}
              className="text-xl!"
            />
          )}
          <textarea
            name="description"
            placeholder="Description"
            value={section.description}
            onChange={handleTextChange}
            required
          />
          {formType === 'products' && index !== 0 && (
            <input
              type="url"
              name="externalLink"
              placeholder="Link URL (optional)"
              value={section.externalLink}
              onChange={handleTextChange}
            />
          )}
        </div>

        {/* Remove Section Button */}
        {index !== 0 && (
          <Trash
            onClick={() => dropSection(index, section)}
            className={`absolute top-0 text-2xl ${index % 2 !== 0 ? 'right-0' : 'left-0'}`}
          />
        )}
      </section>
    </div>
  );
};
