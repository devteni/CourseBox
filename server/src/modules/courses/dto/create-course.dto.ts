export class CreateCourseDto {}

type File = {
  fieldname: string;
  originalname: string;
};
export class CreateCourseMaterial {
  title: string;
  description: string;
  courseId: number;
  file: File;
}
