import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mediaGrid',
  templateUrl: './media-grid.component.html',
  styleUrls: ['./media-grid.component.css']
})
export class MediaGridComponent implements OnInit {


    @Input() pagination: any = { current : 8, totalRecords : 50, recordPerPage : 4, previous : false, next : false, pagination : true };

    @Input() rows : any =
    [{
      "id": 1,
      "title": "Environmental Specialist",
      "tag": "German",
      "text": "lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo",
      "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI6SURBVDjLpVNNaFNBEP5e8hJiSjVVTComsdYUMbRVUhSVgFawgqgo6FFBaMEeehQ8WAQFj57FCh4KVixCERXipQhCa6kaEz00uSQIghibNn++t7tv4+6mTU2bi3Rh+WZn95v5ZndWq1ar2MzQ1zuGHs85xwaPEIF9qz5uWbBW5vjIiY/Sd+n+qz5GKbT1CgRxnwCPmPPBHW5wLolcBTEJxfT7+RtccI5Fwg9RtdYU3Jwddgp4DVwfrXJrBpoNt87trwfmnCP2KYvU9z13ZObTB/04e7izoYRvFrP8qwspV45kMqlsxhj6u7uxd7u+q7V1KwK+NsTj8VoJIvsXn7O9Vx7K5rMgJkVpqQzTICjmSwrl+unQJDKZDMLhMLxerwqqC/IHr8PX29HSCcYZ/C1BhRVigHKKP1SgxTAx8QwyWaFQgGmaSl0qlYIuZFOmMRCLKCITh6lA0zIFkcJkZs1HmCL9e+mhUAj6g+ij6HDs2udypXLIZd+C7M8sfuVzDdJlSYyyBrK00+n02jNefX55gRgkyAo9I05ycmx5aRlTty/AMAxVKyEEuVwOiUQCkUgEgUBA+eqvIMg9IuNLe/H4V2arEeRwuVz1jG63Gx6PR01d1+FwODY20vm7U0ftNm1m8fciKCWidrqCNfti9IAKNv5mVvjpxlbWgB9yo2P3zqa9/+LdnLqPMwP9zf+ClC4zZgrFpgrafV7VWLG300qB9j+/sevKvSflcumUbOVtnraF9OTogLbZ7/wXRdt3lZxkvhIAAAAASUVORK5CYII="
    }, {
      "id": 2,
      "title": "Marketing Manager",
      "tag": "Belarusian",
      "text": "accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa",
      "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADzSURBVDjLxZMxTsRAEATL6EROSsDD+A4xv+EzJCQEiA9ccjtdBF7ba9nZBWw00k63qmd2J5V7zgN3nstSvH/8rChRBKoAwYQIlbmuwNvry7QzAHh+ekTEgICRCA4mCXz9Xo8EpWgXBFS003SjRBKp20mEqhkRJenCpc7e5FY5GliZG4UkGLogq3AxbO3EoAVSkt40Ny91NhIhzaNBWqi45nTIbI+0kLQzg9agKmv+vclGpNByFqGKqkufehfaVzkMUKXqlGC+WHED6dnHddpndUJgn8F+4iP68k4G/UgQPr+va+YkWBIgtT1vE8bvN/37b/wDV/Vlq22fLE8AAAAASUVORK5CYII="
    }, {
      "id": 3,
      "title": "Human Resources Assistant II",
      "tag": "Telugu",
      "text": "vulputate justo in blandit ultrices enim lorem ipsum dolor sit",
      "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIjSURBVDjLpZNNaBNBFMffJNumS61t1cRYUYwGvHgRj+pNUYmkh54UPFnEgrESaA0oloKC1UuEKmoRD6HgoSIRK1ooUhUMoYpaBWvS9IvmUCMFYbs7Xzu+bU2s9kOwC392Zva937z57xuilILVPK5/BbSkmtzR16di/w0QXNzhlB9f7jtZ6QjNA41xf8WmZoTAyHTuG6fsLbX4c2axh4+b+iZXBJx9cfLyxgr/hR01QZC2BIMZUPjxHfKFPAyPfk0ipGPgYuqNtlTy+cR4iG1g5czFgEkGM+YMaO5y0DwabNu8HUCR+vS7Qdgd3RVZ5EFrYlyX0o7fPpJozeazne9HP4BlUchMZIDimwoK671eqPPX1VOTNiyqAJNbUEFn3H3sUeRo54E1Q8Of9mDJ/Xj+hv17921xKqmurQFG+aE/ANH7uYC0VQwBpTXTsBoxOfaqLX0FS4anvc/OcSZAoKSQh8ExsahIVybZ0TOmTt/6opx5zyBLogILY/5WyYNIVza0rtIdLiP4739XELYVfH6QZpe6U0xftpHO3M2gcTLuwZlhyRIAk2Gnj+i+KtIupPp476UVWhLgGOerKgtyboPFbCh6gH7MQao9BLbWkuBanTy52W8mb/TNBooADc87Zxx2FJiYjDstAAAwoXANwO0i4K0kzo7hsYI4eK3XuIp51zUsN44DPTc9+2tHlD3fnQ5saAqh9vy4KATrGNuOYSfIaq/zT68cX09iiVY0AAAAAElFTkSuQmCC"
    }, {
      "id": 4,
      "title": "Actuary",
      "tag": "Swedish",
      "text": "odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper",
      "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKpSURBVDjLpZPNa5xVFIef+877Tmcyk2Q+M0onSVOKnVQRMaBWNwq6c6NQ0IV/gLjspuBGkEKh2JUb14J24UZol5EKRaqhtjiNCamtDcSkNpkknUzn/bj3nOsibbF02bM5cBbP+R0ejvHe8ywVfnj6YqXdKP88NpJv4w14RbxHrCVNLdZasiQlTVNcnCJJTBYn7G7urK8u3X43nJ4Y7R5/cbI906oBoA8TiXpU/T5MFFGPiCDqsSL8fv3P2qW0vxQerJfazZEcK6t3cSJc7d7hjbkOC9dWeOWlKZxVrt24w+zsIS5f7jJ5aAIR5YX2OM3nnq+GxuxvjXKG7YEydIahRGwPLT9duYmIoj4go0hq8vS2+ky3qzhVjDGYL779xQcuJlCPCXIcf/UoO1keUX14BjhRnCpj4ZD5+QXSQQ+XWTb/6RP+urj6Safpz9THS7lms93K5Ytm/eYS63d7ZE5wThBRrMB777zGkWOH9dbiXndjr69/Lf12zjzS+Nm5C9+9/vLMx53D04yXRzg6ETyh65sLf1AYKbK59S9XF7oXvz/76fsAAcCJL3+cqlfKH7SadTKB8oGnfTcqoyyv9qhW6kTlxpuP5sHbJ8+beHv3h85Mq4AJwQSMFcxTgFZtlJ37A8JCiamDY9W5t059DhBc+uoj35mdmatWqmzsWkSVYvQkwHtPqRiRxDG9PaFYnWK0VjkBEAIkmQYbW7vc2nhAkjaYv7JInGQ4UVIrWGtJk5QsSVlZXqEUKUHQDx8DnLVYUTLnWL69hqjHOUVlv4sYCPIE+Rz9BxnjtYgwnz/yvwQZcZwx2TiAuBD1HhXFOYf3EU4EFY/3iqgyHMS4LOMx4O/rN5aH9zY7UaGEikNVUSt4l6HOgxfEOvCKqpIMBtxbW/sawDzrO/8H1LyIqK9H3tEAAAAASUVORK5CYII="
    }, {
      "id": 5,
      "title": "Physical Therapy Assistant",
      "tag": "Chinese",
      "text": "at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus",
      "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKASURBVDjLjZJfaFJRHMf3sOhlSG8RvfbQS0G9RNBLPRUEPfQQPQQrVkH1VC/BegkEL1O7ouhwORS1beI2///Z9TKk2EMEM3QqTkQKdU5S58VhE9q33zmkrRhjB36ce889n+/5/r73jAAYOaoikYgqGAxKfr9fWFpaGv3/+3HghM/n6y4uLioej0eYm5sbPZZAOBxWBQIBBu/W63V0u10QvOdyuQSHw3HySIEBvLy8vFur1UDPoBagKArsdvsvm80WslqtJw4VCIVCKtosD2AGzs/Pg9pBu93mTghWLBaLYDKZRg+FKazdarUKss9sgxxhvViFGMnC/+UbzGbzvtFoTIqieGoIU1gqAmQKi8PkAG63GySKZrMJ80oeE+8/45VrHd8rNRCs6HS6a4fC5AAUFu+90WggmUziR7OFSU8Kno95BOVP0Gq1fUEQbnABOk32er397e1tkAicTifvncEkjtXVVZTLZWQLJXwIyAzeI/jyMESCpYWFhf1KpYJisQhJkjjMHESjUZRKJbgiVry0PMCTd3dwX329e+v1xTdDAUpZSafT2NnZwebmJgqFAnfAks/lcrD5DHjrfYjwhhlfaxLExDPcEy/gyvMzOi5AYW2tra0hFouh1Wohn89zkWw2i1QqhXHhJgIZAwI5I9jQyY8hyk+ZQI8L0M06PTs7208kEvzXsdQ7nQ4ymQxkWcbtyUuIbthwcATTZibw9w7MzMyMTU9PN1jP7BeyvuPxOCis3tUXZ39qpUfQSOMc1qyM/+tgUHSzxgwGwxbrnwWo0Wh6arX6HG1U39Wdh16a4Cezmb0PMzhYer1+bGpqaotghcGDddosUCnM9p9ZYOu/ASUg4G4xOdG6AAAAAElFTkSuQmCC"
    }, {
      "id": 6,
      "title": "Quality Engineer",
      "tag": "Polish",
      "text": "nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat",
      "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHfSURBVDjLfVI9TwJBEJ2DMxwf1xASSCxsrIwN1TUUFhaUFlr4AwyNsaZQCioqepB/AIWtUaMYGhNiSWdHQUAp4Djue505b83yoZtMZm/vzZs3b1dijAFf3tUlg4NDcB8egLkuMM8D33HAD/NOsQjs8QWST/cSr5FBWGIREwp9OufZdsSSNQLHDUh8ywrAARHlcC9vIYisEOBPhsWwtwcekWBQ9kwTpP198I0lYux/FNhO1TTNyvT0DHQ1BWY0Cg5Jn89B+fyC7PMrqIj5k+Dj5nrIDENP7+6mFPz2fR+4yUgM79GobhwfDc+FGokDBoOB5rruXTabzc2x43K5DAgoIpEIxGKxILrd7siyrJNSqfS24gFKLWcymdxsNgPDMMDDG6AgAhpD1/XgPJ/P51BNecNEBBVIDXV2yfWwOwUnWywWkEwmARUUNjywbTtNYF4Mggfid+hHehvBL1jM63sKi656fQQ8nHJD+excPt9LkhQoJOw2gh7NT07zrmLQWTweh/F4TGp7GwQ4V63f748URYFEIrHiAXUm82RZhk6nM0KC2sY7oNVqtS5QSVXTtJyqqj+vM1QzmUyg3W6P8LYqjUbjdisBrXq9riFJGbsU6GbIXCyaYvQwas1m803EfwO4vsGvr9ICrgAAAABJRU5ErkJggg=="
    }, {
      "id": 7,
      "title": "Mechanical Systems Engineer",
      "tag": "Tswana",
      "text": "cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor",
      "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD7SURBVDjLY/z//z8DJYCJgULAgi6gUvvEWEOVY6aqJJsxw79/DAxIDrxw+9ee/blirnhdYKjHtcpKmd1YiZ+JQZKbmeHivV97+j0EGEGaGf4T4QIZPiYlXhZGsM2g4Pn/FyL+/x+I/Ec4DEA2vv32jwEetjAa6B2YYXgNeHD/Z9iOM19XP3j3h+Hbz/9ATRBbwbH19z9hL9zrkn0PpMIUCh4Jaqpz7IZF8/8/DAwMWKIcZzQ+mCD3/tu3v+8Z/sC88h8aDgRcgAzAfoa54C9WB+A3AORnmCYw/ZdEA/4hO/kvAwMDyS74j4j6//+w6ifkBYQmXAmJccBzIwCU7Hm5Y0odkQAAAABJRU5ErkJggg=="
    }, {
      "id": 8,
      "title": "Structural Analysis Engineer",
      "tag": "Lao",
      "text": "est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum",
      "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIvSURBVDjLpdNdSFNhHMdx6YVIhaALC8GLoFcso5dVRHVRFFQISlJeVFYQgdKKiEprldrmS8KgWYK2raZGbaOcafamLVxq6qxs5qxIHYpkUiYsmVvn2zmnGBbkhbv48Ryeh//n+Z/D/4QBYaHkvweagxujb6cttzlOLuqtP7Wgx3I0tjr38Gp9TnIMYu6L2TEh8DkjQhgzJSL0tSC4rAR0K+i8EId/9BtPLq2RERnQ7Fs7xZs/4643b/qYN3caXrWY7KkEGnQw2AkjA9DnhN5G7FU38DzVUHYiTgIOyUBByqqI0ZyZ9bSUgNMIzeL6/iF4mqDrAQy8+b3fdJUipYK+51q0KfMkIFoG9EeWLfRlRrbLQFkilCZAbSa0ikU9DvHmF+KznmHzcZ81XcGHe0qpmOBHtB2bn+BXz/HQoofyJLi1B+qy4FU59Iutd9WIXRXTWaEbthdsprtG9TfgzJirFhza7zxWgXkvWPbDMzW8NcPXbvhYC+5qWiv1vDPtpvHKNglwBYEvmshK8YaA3LphOzw6B+134JOdQKvx54gx6YfPGO9/XZ4uAxXn10tAdhAYzY94KTQWQlupGBNCRyW+QgVDqkih7fJOp79em9x/84BhZUwULsMuilNjJWBTELAol5R0qKK8Q1nhwmBmuOA+PdtnTl3cMH4mxIIt19OWyh2Mf/8JB+kfIM92cUNIgLu5KD4kQC6uK9gaHOFJAdaz6yTgzGSAa3/+QmmdNf7sF2A4ynPOLQFtAAAAAElFTkSuQmCC"
    }, {
      "id": 9,
      "title": "Help Desk Operator",
      "tag": "Swedish",
      "text": "odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est",
      "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKDSURBVDjLhZNrSJNRGMc3HeoQL1ObhEMhcWyB5IWScn1KRPoSBBFUFBmpJOQXv4RhXlasRbZFXmDkXLowIxesrSGTodvaLWcEKdTMyWAtQteFsWSLf+e8zlHo6sD/fd7nPOf/e877cg4LAIuKDLZYLG5QKpVuoVDYRHIOnUuIU1NTI1GpVA66hs4lffThI8FB5DEYEAwG4dLrmdyXEH33mkxMbcFoTNYSjVlsmrzNzMSSzYZAIIB3JL5JT8d6WhqjRTYbS3Y7U6NrFhOAxO62AO+zszGt0cDv92NarYa3qAhrBQVYy83Fay4X06OjWzUSl3cDfMnLw6xIhBGBAOayMqyUlmK1pAQf+XwsE5AhJwf3s7LwIiMDQbKjHYAfhYX4XF+PUG0tPlVWIkBga+XlWCWgFQLyFRfjA9mVj8fDOofzN8DlciEej6dULBZDNBplRAedo56UgEgkAo/Hg42NDbjdbjgcDlydkOCyuho/Y9H/A6hZp9MxnTc3NxEKhdA6Vode/RmcHhHhe+QrnE7nTgA1bEM6tEdJ18Noe3QQzQ+rcF13ClMeJTqfnkCjYi/m7JbdAdtqH6/Dc+8Qni08YIyTHgUU5k5oHHK0aRtxSMbF/i52fkrAJfK91Dww04HbpnbcNLagR38RfYZWjMz349yYBBU3WHHmKFMAMf36E3BWJcYTtwJa511oXskxapcRyBUMz/ehRduEA1IeSq6xqhiA2WxGOBz+RiHb/+Dk8D4cVwrQcI8PyZ18nFcfwdBcD5rHG1ErK8bUzGMkL9Pg4CAsFgusVmtKVd/i4oLmGKr792Dy5QSoJwmQSqU2co3xL1V0Z6C0Kx29A91MLpfL/dT7G1NDhMW9KO0jAAAAAElFTkSuQmCC"
    }, {
      "id": 10,
      "title": "Software Test Engineer III",
      "tag": "Montenegrin",
      "text": "vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus",
      "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIcSURBVDjLjZO/T1NhFIafc+/trdRaYk1KUEEWjXHRaCSik+E/cDHGzYXB2YHRhMRFY1SYmRgYHZ3VxIRFDYMraMC2hrbQXm7v9+M4UGobiOEk7/adN+9zvnNEVQEQkYvAGBDy/6oBm6rqAVBVeia30jRtGmOctVaPU5qmuri4+AaYAgJVHTKYNsa4drutnU6nr1arpY1GQ6vVqlprdXt7W5eWlvomMv/uw6tSofB4p+NOF0biYtc48tEAhXiuTZzh/s1xyuUyWZbhvWdlZeXt3Nzca14sf6zW6nXf7uzrcfq9s6sLy5+1Xq8fQQKmo1ZCvlAoyo+tXT5tPGO09IckM2zWznH3/AJ3rl5ACInjmGazifceay2VSgWASISSBaz3FIs1RnJlPF18vEG1keDVk1lLFEWICM45wvAfYqTKriqje0lGI01x2qFtuuwkKQ26oEKcCwnDEBFBRA6HfmBw8JWwl3o2ti7j8+u0TUKzcYkrY/n+wyAIEJEjSxEglLyH5r7j+tg8T1oVZr8GzE69JIoiFMiM7zeHYUgQBAMJVBGU77+eYoxhLcvIxnNk6w8xxvDo3hqH+yIieO+HEkQB/qe6bPL5g/cckCkDiBhjOJULhlCGDJIkXX2z+m3GeW4UCnExyxxxHIIOLNLk2WP5AaQXTYDb1tovgHCy8lEUzQS9g1LAO+f2AX+SZudcAjgZOOeJ3jkHJ0zggNpfYEZnU63wHeoAAAAASUVORK5CYII="
    }];


      constructor() {
        this.pagination.previous = false;
        this.pagination.next = true;
      }

      ngOnInit() {
      }

}
