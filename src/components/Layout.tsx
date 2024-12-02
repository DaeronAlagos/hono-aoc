import type { FC } from 'hono/jsx'

export const Layout: FC = (props) => {
    return (
        <html lang='en'>
            <head>  
                <link href="static/output.css" rel="stylesheet" />
            </head>
            <body>{props.children}</body>
        </html>
    )
}
