import strawberry
from strawberry.file_uploads import Upload
from .starvector_infer import image_to_svg

@strawberry.type
class SVGResult:
    svg_code: str

@strawberry.type
class Mutation:
    @strawberry.mutation
    def upload_image(self, image: Upload) -> SVGResult:
        image_bytes = image.read()
        svg_code = image_to_svg(image_bytes)
        return SVGResult(svg_code=svg_code)

schema = strawberry.Schema(mutation=Mutation)