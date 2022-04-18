import { DashboardLayout } from "$src/components/app/DashboardLayout"
import { SettingsLayout } from "$src/components/app/SettingsLayout"
import { Button } from "$src/components/ui/Button"
import {
  useSiteQuery,
  useUpdateSiteMutation,
  useDeleteSiteMutation,
} from "$src/generated/graphql"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { useEffect } from "react"
import toast from "react-hot-toast"

export default function SiteSettingsPage() {
  const router = useRouter()
  const subdomain = router.query.subdomain as string
  const [siteResult] = useSiteQuery({
    variables: {
      domainOrSubdomain: subdomain,
    },
    pause: !subdomain,
  })
  const [, updateSiteMutation] = useUpdateSiteMutation()
  const [, deleteSiteMutation] = useDeleteSiteMutation()

  const site = siteResult.data?.site

  const form = useFormik({
    initialValues: {
      name: "",
      bio: "",
    },
    async onSubmit(values) {
      const { error, data } = await updateSiteMutation({
        id: site!.id,
        name: values.name,
        bio: values.bio,
      })
      if (error) {
        toast.error(error.message)
      } else if (data) {
        toast.success("Site updated")
      }
    },
  })

  const deleteSiteForm = useFormik({
    initialValues: {},
    async onSubmit() {
      const site = siteResult.data?.site!

      if (prompt(`Enter "${site.name}" to delete the site`) !== site.name) {
        return
      }
      const { error } = await deleteSiteMutation({
        id: site!.id,
      })
      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Site deleted")
        router.push("/dashboard")
      }
    },
  })

  useEffect(() => {
    if (siteResult.data) {
      const site = siteResult.data.site
      if (!site) {
        alert("Site not found")
        return
      }
      form.setValues({
        name: site.name,
        bio: site.bio || "",
      })
    }
  }, [siteResult.data])

  return (
    <DashboardLayout mainWidth="md">
      <SettingsLayout title="Site" subtitle="Manage settings for this site">
        <form onSubmit={form.handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm">
              Name
            </label>
            <input
              id="name"
              className="input is-block"
              name="name"
              required
              value={form.values.name}
              onChange={form.handleChange}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="bio" className="block mb-2 text-sm">
              Bio
            </label>
            <textarea
              id="bio"
              className="input is-block"
              name="bio"
              value={form.values.bio}
              onChange={form.handleChange}
              rows={6}
            />
          </div>
          <div className="mt-5">
            <Button type="submit" isLoading={form.isSubmitting}>
              Save
            </Button>
          </div>
        </form>
        <div className="mt-14 border-t pt-8">
          <h3 className="text-red-500 text-lg mb-5">Danger Zone</h3>
          <form onSubmit={deleteSiteForm.handleSubmit}>
            <Button
              variantColor="red"
              type="submit"
              isLoading={deleteSiteForm.isSubmitting}
            >
              Delete Site
            </Button>
          </form>
        </div>
      </SettingsLayout>
    </DashboardLayout>
  )
}
